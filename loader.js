;(function(global, callback) {
	var _ver = "2.0.1",
		_clearCount = 0,
		_mods = {},
		_m = {
			js: "m",
			css: "s",
			html: 't'
		},
		_defaults = {
			debug: false,
			js: {
				url: "",
				list: [],
				state: 0,
				onLoad: function() {},
			},
			css: {
				url: "",
				list: [],
				state: 0,
				onLoad: function() {}
			},
			html: {
				url: "",
				list: [],
				state: 0,
				onLoad: function() {}
			},
			onLoad: function() {}
		},
		doc = global.document,
		a = {},
		expose = +new Date(),
		rExtractUri = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/,
		isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;
	/**
	 * 获取当前脚本路径
	 * @return {String}
	 */
	var _getCurrAbsPath = function() {
		if (doc.currentScript) {
			return doc.currentScript.src;
		}
		var stack;
		try {
			a.b();
		} catch (e) {
			stack = e.fileName || e.sourceURL || e.stack || e.stacktrace;
		}
		if (stack) {
			var absPath = rExtractUri.exec(stack)[1];
			if (absPath) {
				return absPath;
			}
		}
		for (var scripts = doc.scripts,
				i = scripts.length - 1,
				script; script = scripts[i--];) {
			if (script.className !== expose && script.readyState === 'interactive') {
				script.className = expose;
				return isLtIE8 ? script.getAttribute('src', 4) : script.src;
			}
		}
	};
	var _apply = function(obja, objb) {
		for (var b in objb) {
			if (objb[b] && objb[b].constructor == Object) {
				if (!obja[b]) {
					obja[b] = {};
				}
				arguments.callee(obja[b], objb[b])
			} else {
				obja[b] = objb[b];
			}
		}
		return obja;
	};
	var exports = _apply(_defaults, global['exports']);
	/**
	 * 所有资源加载完成事件
	 */
	var _onAllLoad = function() {
		_clearLoading();
		exports.onLoad();
	};
	/**
	 * 检查加载状态
	 * @return {Boolean}
	 */
	var _checkOnLoad = function() {
		return (exports.html || {}).state && (exports.js || {}).state && (exports.css || {}).state;
	};
	/**
	 * 模块类	
	 * @param  {String} id     
	 * @param  {Function} factory 
	 * @param  {String} version 
	 */
	var _Module = function(id, factory, version) {
		this.version = version;
		this.cacheTime = +new Date;
		this.id = id;
		this.deps = [];
		this.factory = factory.toString();
		this.loadVer = _ver;
		this.domin = document.URL;
		return this;
	};
	_Module.prototype = {
		save: function(type) {
			try {
				localStorage.setItem("_" + type + "_" + this.id, JSON.stringify(this))
			} catch (exp) {
				_emit("saveError", exp);
			}
			return this;
		}
	};
	var _emit = function() {
		//console && console.log(Array.prototype.slice.call(arguments));
	};
	/**
	 * 所有模块会调此函数，利用Function.toString()原理存本地存储	
	 * @param  {String} id     
	 * @param  {Array} deps    依赖
	 * @param  {Function} factory 函数
	 * @param  {String} type    类型
	 */
	global.$define = function(id, deps, factory, type) {
		if (arguments.length === 2) {
			factory = deps;
			type = "m";
			deps = null;
		}
		if (arguments.length === 3) {
			type = factory;
			factory = deps;

			deps = null;
		}
		new _Module(id, factory, _getVersion(id)).save(type || "m");
	};
	/**
	 * 获取传入模块id的版本号，用于和本地存储的版本号判断是否需要更新
	 * @param  {String} id 
	 * @return {String}   版本号
	 */
	var _getVersion = function(id) {
		var file = _getCurrAbsPath().match(new RegExp("" + id + "([^,]*)", "g"));
		return file && file.length && file[0].split("?").length ? file[0].split("?")[1] : 0;
	};
	/**
	 * 加载js
	 * @param  {String} src 	URL
	 * @param  {Object} config   配置
	 */
	var _get = function(src, config, index, exports) {
		function c() {
			d && (d.onload = d.onreadystatechange = d.onerror = null, d.parentNode && d.parentNode.removeChild(d), d = null)
		}
		var d = document.createElement("script");
		config = config || {}, d.charset = config.charset || "utf-8", d.onload = d.onreadystatechange = function() {
			(/loaded|complete/i.test(this.readyState) || -1 == navigator.userAgent.toLowerCase().indexOf("msie")) && (config.onLoad && config.onLoad.call(this, index, exports), c())
		}, d.onerror = function() {
			config.onError && config.onError.call(this, index), c()
		}, d.src = src, config.defer && (d.defer = "defer"), config.async && (d.async = "async"), config.crossorigin && d.setAttribute("crossorigin", "true"), document.getElementsByTagName("head")[0].appendChild(d)
	};
	/**
	 * 返回模块
	 * @param  {String} id 模块名
	 * @return {Object}    模块
	 */
	global.$require = function(id) {
		return _mods[id];
	};
	/**
	 * 加载资源存本地存储，但不执行
	 * @param  {String} server  服务器地址
	 * @param  {Array} _list   	文件列表
	 * @param  {Boolean} execute 是否强制执行
	 * @param  {String} type    类型
	 */
	global.require = function(server, _list, execute, type) {
		var fun = arguments.callee;
		type = type || "m";
		list = _list;
		global.execute = typeof(execute) == "undefined" ? false : true;
		var modes = [];
		for (var i = 0; i < list.length; i++) {
			var path = list[i].split('/');
			var ls = _getModeName(list[i]);
			var ver = list[i].split('?');
			var ext = list[i].match(/.*\/(.*)\?.*/);
			if (_checkUpdate(ls, ver[ver.length - 1], false, type)) {
				modes.push([ls, ver[ver.length - 1], ext[ext.length - 1].split('.')[ext[ext.length - 1].split('.').length - 1], path.slice(0, path.length - 1).join('/')]);
			}
		}
		var urls = _getUrls(server, modes);
		if (modes.length) {
			_emit("getUrlsRequire", urls);
			_get(urls, {
				onLoad: function() {
					_emit("onLoadRequire", arguments);
					global.execute = !execute;
				},
				onError: function() {
					// setTimeout(function() {
					// 	fun(server, _list, execute, type);
					// }, 16);
					_emit("onErrorRequire", arguments);
				}
			});
		} else {
			_emit("inLocalRequire", arguments);
		}
	};
	/**
	 * 检查是否需要更新
	 * @param  {String} id      模块号
	 * @param  {String} nowVer  当前版本
	 * @return {String}   非空     
	 */
	var _checkUpdate = function(id, nowVer, execute, type) {
		var mod = localStorage.getItem("_" + type + "_" + id);
		if (mod) {
			var obj = JSON.parse(mod);
			return (parseFloat(nowVer.replace(/\./g, "")) > parseFloat(obj.version.toString().replace(/\./g, ""))) ? id : false;
		} else {
			return id;
		}
	};
	/**
	 * 生成完整的URL
	 * @param  {String} server 服务器地址
	 * @param  {Array} list   文件列表
	 * @return {String}       URL
	 */
	var _getUrls = function(server, list) {
		var arr = [];
		for (var i = 0; i < list.length; i++) {
			arr.push(list[i][3] + '/' + list[i][0] + "." + list[i][2] + "?" + list[i][1])
		}
		return server + arr.join(",")
	};
	/**
	 * 执行单个模块
	 * @param  {String} mod  模块
	 * @param  {String} id   模块号
	 * @param  {String} type 类型
	 */
	var __execute = function(mod, id, type) {
		var obj = JSON.parse(mod);
		var fun = new Function("return " + obj.factory)();
		var module = {
			exports: {}
		};
		if (type == "m") {
			fun.call(global, null, global, module);
			_mods[id] = module.exports;
			_mods[id] && typeof(_mods[id]) == "function" && _mods[id]();
		} else if (type == "t") {
			var t = document.createElement('div');
			t.innerHTML = fun.call(global, null, exports, module);
			var ss = t.getElementsByTagName('script');
			for (var i = 0; i < ss.length; i++) {
				if (ss[i].type != "text/template") {
					new Function(ss[i].textContent)();
				}
			}
			var els = t.removeChild(t.firstChild);
			if(els.className.match(/page/)){
				document.body.appendChild(els);
			}else{
				for(var i=0;i<els.childNodes.length;i++){
					if(els.childNodes[i].nodeType==1){
						document.body.appendChild(els.childNodes[i]);
					}
				}
			}
		} else {
			var sty = document.createElement('style');
			sty.type = "text/css";
			sty.id = "__m__" + obj.id + "_" + obj.version;
			sty.innerHTML = fun.call(global, null, exports, module);
			document.getElementsByTagName("head")[0].appendChild(sty);
		}
	};
	/**
	 * 执行所有传入类型的模块
	 * @param  {String} type 类型
	 */
	var _execute = function(type, exports, index) {
		type = type || "m";
		var ret = [];
		if (type == "m") {
			if (arguments.length == 3) {
				var i = index;
				var _id = exports.js.list[i].match(/.*\/(.*)\?.*/)[1].split('.');
				_id.pop();
				var id = _id.join('.');
				var mod = localStorage.getItem("_" + type + "_" + id);
				try {
					mod && __execute(mod, id, type);
				} catch (err) {
					window["console"] && window["console"].error(type, "_" + type + "_" + id);
				}
			} else {
				for (var i = 0; i < exports.js.list.length; i++) {
					var path = exports.js.list[i].split('/')
					var _id = exports.js.list[i].match(/.*\/(.*)\?.*/)[1].split('.');
					_id.pop();
					var id = _id.join('.');
					var mod = localStorage.getItem("_" + type + "_" + id);
					try {
						mod && __execute(mod, id, type);
					} catch (err) {
						window["console"] && window["console"].error(type, "_" + type + "_" + id);
						ret.push([type, "_" + type + "_" + id]);
					}
				}
			}
			return ret;
		}
		if (type == "s") {
			if (arguments.length == 3) {
				var i = index;
				var path = exports.css.list[i].split('/');
				var _id = exports.css.list[i].match(/.*\/(.*)\?.*/)[1].split('.');
				_id.pop();
				var id = _id.join('.');
				var mod = localStorage.getItem("_" + type + "_" + id);
				mod && __execute(mod, id, type);
			} else {
				for (var i = 0; i < exports.css.list.length; i++) {
					var path = exports.css.list[i].split('/');
					var _id = exports.css.list[i].match(/.*\/(.*)\?.*/)[1].split('.');
					_id.pop();
					var id = _id.join('.');
					var mod = localStorage.getItem("_" + type + "_" + id);
					mod && __execute(mod, id, type);
				}
			}
			return ret;
		}
		if (type == "t") {
			for (var i = 0; i < exports.html.list.length; i++) {
				var path = exports.html.list[i].split('/');
				var _id = exports.html.list[i].match(/.*\/(.*)\?.*/)[1].split('.');
				_id.pop();
				var id = _id.join('.');
				var mod = localStorage.getItem("_" + type + "_" + id);
				mod && __execute(mod, id, type);
			}
			return ret;
		}
	};
	/**
	 * 获取模块名
	 * @param  {String} str 路径
	 * @return {String}     模块名
	 */
	var _getModeName = function(str) {
		var ls = str.match(/.*\/(.*)\?.*/);
		var arr = ls[ls.length - 1].split('.');
		var ret = arr.pop();
		return arr.join('.');
	};
	/**
	 * 清除加载动画,
	 */
	var _clearLoading = function() {
		_emit("_clearLogin:" + _clearCount);
		var el = document.getElementById('loading');
		if (el) {
			el.style.opacity = 0;
			setTimeout(function() {
				el.parentNode && el.parentNode.removeChild(el);
			}, 300)
		} else {
			_clearCount++;
			if (_clearCount == 1) {
				setTimeout(arguments.callee, 16);
			} else if (_clearCount == 2) {
				setTimeout(arguments.callee, 100);
			} else if (_clearCount == 3) {
				setTimeout(arguments.callee, 500);
			} else if (_clearCount == 4) {
				_clearCount = 0;
				setTimeout(arguments.callee, 2000);
			} else {
				_emit("..." + _clearCount);
			}
		}
	};
	/**
	 * 加载CSS
	 */
	var _initCSS = function(csss) {
		var fun = arguments.callee;
		var modes = [];
		exports = csss || exports;
		exports.css.state = 0;
		if (exports.debug || exports.css.debug) {
			_debug('css', exports, csss);
			return;
		}
		modes = _getNeedLoad('css');
		var urls = _getUrls(exports.css.url, modes);
		if (modes.length) {
			_get(urls, {
				onLoad: function() {
					_execute("s", exports);
					_emit("onLoadCSSInit", arguments);
					exports.css.state = exports.css.list.length;
					exports.css.onLoad("server", exports, modes);
					!csss && _checkOnLoad() && _onAllLoad();
				},
				onError: function() {
					window["console"] && window["console"].error("onErrorCSSInit",arguments);
				}
			});
		} else {
			_execute("s", exports);
			_emit("inLocalCSSInit", arguments);
			exports.css.state = exports.css.list.length;
			exports.css.onLoad("local", exports);
			!csss && _checkOnLoad() && _onAllLoad();
		}
	};
	/**
	 * 调试模式下加载资源
	 * @param  {String} type    类型
	 * @param  {Object} exports 所有配置项
	 * @param  {[type]} list    指定要加载的列表
	 */
	var _debug = function(type, exports, list) {
		for (var i = 0; i < exports[type].list.length; i++) {
			var _modes = [];
			var path = exports[type].list[i].split('/')
			var ls = _getModeName(exports[type].list[i]);
			var ver = exports[type].list[i].split('?');
			var ext = exports[type].list[i].match(/.*\/(.*)\?.*/);
			_checkUpdate(ls, ver[ver.length - 1], true, _m[type]);
			_modes.push([ls, ver[ver.length - 1], ext[ext.length - 1].split('.')[ext[ext.length - 1].split('.').length - 1] + (type == "js" ? "" : ".js"), path.slice(0, path.length - 1).join('/')]);
			var _urls = _getUrls("", _modes);
			_get.call(this, _urls, {
				onLoad: function(index, exports) {
					exports[type].state++;
					if (exports[type].state == exports[type].list.length) {
						_execute(_m[type], exports);
						exports[type].onLoad("server", exports, modes);
						!list && _checkOnLoad() && _onAllLoad();
					}
				},
				onError: function() {
					window["console"] && window["console"].error("_debug",arguments);
				}
			}, i, exports);
		}
	};
	/**
	 * 检查需要加载的资源
	 * @param  {String} type 资源类型
	 * @return {Object}      
	 */
	var _getNeedLoad = function(type) {
		var modes = [];
		for (var i = 0; i < exports[type].list.length; i++) {
			var path = exports[type].list[i].split('/')
			var ls = _getModeName(exports[type].list[i]);
			var ver = exports[type].list[i].split('?');
			var ext = exports[type].list[i].match(/.*\/(.*)\?.*/);
			if (_checkUpdate(ls, ver[ver.length - 1], true, _m[type])) {
				modes.push([ls, ver[ver.length - 1], ext[ext.length - 1].split('.')[ext[ext.length - 1].split('.').length - 1] + (type == "js" ? "" : ".js"), path.slice(0, path.length - 1).join('/')]);
			}
		}
		return modes;
	};
	/**
	 * 加载JS
	 * @param  {Object} jss 配置项
	 */
	var _initJS = function(jss) {
		var fun = arguments.callee;
		var modes = [];
		exports = jss || exports;
		exports.js.state = 0;
		if (exports.debug || exports.js.debug) {
			_debug('js', exports, jss);
			return;
		}
		modes = _getNeedLoad('js');
		var urls = _getUrls(exports.js.url, modes);
		if (modes.length) {
			_get(urls, {
				onLoad: function() {
					var ret = _execute("m", exports);
					_emit("onLoadInitJS", arguments);
					exports.js.state = modes.length;
					exports.js.onLoad("server", exports, modes);
					!jss && _checkOnLoad() && _onAllLoad();
				},
				onError: function() {
					window["console"] && window["console"].error("onErrorInitJS",jss);
				}
			});
		} else {
			var ret = _execute("m", exports);
			if (ret.length) {
				_emit("inLocalInitExecuteError", ret);
				localStorage.removeItem(ret[0][1]);
				_initJS();
				return;
			}
			_emit("inLocalInit", arguments);
			exports.js.state = exports.js.list.length;
			exports.js.onLoad("local", exports);
			!jss && _checkOnLoad() && _onAllLoad();
		}
	};
	/**
	 * 加载HTML
	 * @param  {Object} htmls 配置项
	 */
	var _initHTML = function(htmls) {
		var fun = arguments.callee;
		var modes = [];
		exports = htmls || exports;
		exports.html.state = 0;
		if (exports.debug || exports.html.debug) {
			_debug('html', exports, htmls);
			return;
		}

		modes = _getNeedLoad('html');
		var urls = _getUrls(exports.html.url, modes);
		if (modes.length) {
			_get(urls, {
				onLoad: function() {
					_execute("t", exports);
					_emit("onLoadHTMLInit", arguments);
					exports.html.state++;
					exports.html.onLoad("server", exports, modes);
					!htmls && _checkOnLoad() && _onAllLoad();
				},
				onError: function() {
					window["console"] && window["console"].error("onErrorHTMLInit",arguments);
				}
			});
		} else {
			_execute("t", exports);
			_emit("inLocaHTMLlInit", arguments);
			exports.html.state = exports.html.list.length;
			exports.html.onLoad("local", exports);
			!htmls && _checkOnLoad() && _onAllLoad();
		}
	};
	/**
	 * 检查资源加载完成
	 * @param  {Object} data 配置项
	 */
	var _checkResourcesOnLoad = function(data) {
		var isAllLoad = function() {
			var cssok = (!data.css || data.css.state == data.css.list.length);
			var jsok = (!data.js || data.js.state == data.js.list.length);
			var htmlok = (!data.html || data.html.state == data.html.list.length);
			return cssok && jsok && htmlok;
		}
		if (isAllLoad()) {
			data.onLoad && data.onLoad();
		} else {
			setTimeout(arguments.callee.bind(null, data), 40);
		}
	};
	global.initResources = function(data) {
		data['html'] && _initHTML(data);
		data['js'] && _initJS(data);
		data['css'] && _initCSS(data);
		_checkResourcesOnLoad(data)
	};
	//global.initJS = _initJS;
	//global.initCSS = _initCss;
	//global.initHTML = _initHTML;
	(function() {
		window['exports'] && window['exports'].html && _initHTML();
		window['exports'] && window['exports'].js && _initJS();
		window['exports'] && window['exports'].css && _initCSS();
	})();
	(function() {
		var callbackfun = _getCurrAbsPath().match(/\b\w+$/);
		callbackfun && window[callbackfun[0]] && window[callbackfun[0]]();
		callback && window[callback] && window[callback]();
	})();
	if (!exports.debug) {
		new _Module("load", arguments.callee, _ver).save("m");
		document.cookie = "_m_load=" + _ver;
	}
})(window, null)