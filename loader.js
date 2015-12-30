/**
* 同程加载器
* 
*     @example
*     var exports = {
*         js:{
*             url:"http://js.40017.cn/cn/min/??",
*             list:[
*                 "/cn/train/promote/tongcheng.loadjs/js/zepto.js?1.0",
*                 "/cn/train/promote/tongcheng.loadjs/js/common.0.2.6.js?1.0",
*             ],
*             onLoad:function(){
*                 console.log("js sector clear")
*             }
*         },
*         css:{
*             url:"http://js.40017.cn/cn/min/??",
*             list:[
*                 "/cn/train/promote/tongcheng.loadjs/css/page.css?1.0",
*                 "/cn/train/promote/tongcheng.loadjs/css/autoComplete.css?1.0"
*             ],
*             onLoad:function(){
*                  console.log("css sector clear")
*             }
*         },
*         html:{
*             url:"http://js.40017.cn/cn/train/promote/tongcheng.loadjs/",
*             list:[
*                 "/temp/temp.html?1.91"
*             ],
*             onLoad:function(){
*                 console.log("html sector clear")
*             }
*         },
*         onLoad:function(){
*             console.log("all sector clear")
*             require("http://js.40017.cn/cn/min/??",["/cn/train/promote/tongcheng.loadjs/angularjs.js?1.6.4"]);
*         }
*     };
*     (function(ver){
*         var a = localStorage.getItem("_m_load");
*         if (document.cookie.match(/_m_load/) && a) {
*             try {
*                new Function("return " + JSON.parse(a).factory)().call(window, window);
*                return;
*             } catch (b) {
*                 console.log(b)
*             }
*         }
*         var c = document.createElement("script");
*         c.src = "load.js?"+ver, c.defer = "defer", c.async = "async";
*         document.getElementsByTagName("head")[0].appendChild(c);
*     })("1");
*
* @class loader
* @author colacao <cy14477@ly.com>
*/
;(function(globle) {
	var _ver = "1.0.1",
		_clearCount = 0,
		_mods = {},
		_defaults = {
			js:{
				url:"",
				list:[],
				state:0,
				onLoad:function(){},
			},
			css:{
				url:"",
				list:[],
				state:0,
				onLoad:function(){}
			},
			html:{
				url:"",
				list:[],
				state:0,
				onLoad:function(){}
			},
			onLoad:function(){}
		},
		doc = globle.document,
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
	var _apply =  function(obja, objb) {
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
	var exports  =  _apply(_defaults,globle['exports']);
	/**
	 * 所有资源加载完成事件
	 */
	var _onAllLoad = function(){
		_clearLoading();
		exports.onLoad();
	};
	/**
	 * 检查加载状态
	 * @return {Boolean}
	 */
	var _checkOnLoad = function(){
    	return exports.html.state && exports.js.state && exports.css.state;
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
		return this;
	};
	_Module.prototype = {

		save: function(type) {
			try {
				localStorage.setItem("_"+type+"_" + this.id, JSON.stringify(this))
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
	globle.define = function(id, deps, factory,type) {
		if (arguments.length === 2) {
			factory = deps;
			type="m";
			deps = null;
		}
		if (arguments.length === 3) {
			type=factory;
			factory = deps;
			
			deps = null;
		}
		new _Module(id, factory, _getVersion(id)).save(type||"m");
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
	var _get = function(src, config) {
		function c() {
			d && (d.onload = d.onreadystatechange = d.onerror = null, d.parentNode && d.parentNode.removeChild(d), d = null)
		}
		var d = document.createElement("script");
		config = config || {}, d.charset = config.charset || "utf-8", d.onload = d.onreadystatechange = function() {
			(/loaded|complete/i.test(this.readyState) || -1 == navigator.userAgent.toLowerCase().indexOf("msie")) && (config.onLoad && config.onLoad(), c())
		}, d.onerror = function() {
			config.onError && config.onError(), c()
		}, d.src = src, config.defer && (d.defer = "defer"),config.async && (d.async = "async"), config.crossorigin && d.setAttribute("crossorigin", "true"), document.getElementsByTagName("head")[0].appendChild(d)
	};
	/**
	 * 返回模块
	 * @param  {String} id 模块名
	 * @return {Object}    模块
	 */
	var _require = function(id){
		return _mods[id];
	}
	/**
	 * 加载资源存本地存储，但不执行
	 * @param  {String} server  服务器地址
	 * @param  {Array} _list   	文件列表
	 * @param  {Boolean} execute 是否强制执行
	 * @param  {String} type    类型
	 */
	globle.require = function(server, _list, execute,type) {
		var fun = arguments.callee;
		type = type||"m";
		list = _list;
		globle.execute = typeof(execute) == "undefined" ? false : true;
		var modes = [];
		for (var i = 0; i < list.length; i++) {
			var path = list[i].split('/');
			var ls =  _getModeName(list[i]);
			var ver = list[i].split('?');
			var ext = list[i].match(/.*\/(.*)\?.*/);
			if (_checkUpdate(ls, ver[ver.length - 1], false,type)) {
				modes.push([ls, ver[ver.length - 1], ext[ext.length - 1].split('.')[ ext[ext.length - 1].split('.').length-1], path.slice(0, path.length - 1).join('/')]);
			}
		}
		var urls = _getUrls(server,modes);
		if (modes.length) {
			_emit("getUrlsRequire", urls);
			_get(urls, {
				onLoad: function() {
					_emit("onLoadRequire", arguments);
					globle.execute = !execute;
				},
				onError: function() {
					setTimeout(function() {
						fun(server, _list, execute,type);
					}, 16);
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
	var _checkUpdate = function(id, nowVer, execute,type) {
		var mod = localStorage.getItem("_"+type+"_" + id);
		if (mod) {
			var obj = JSON.parse(mod);
			return (parseFloat(nowVer.replace(/\./g,"")) > parseFloat(obj.version.toString().replace(/\./g,""))) ? id : false;
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
	var _getUrls = function(server,list) {
		var arr = [];
		for (var i = 0; i < list.length; i++) {
			arr.push(list[i][3] + '/' + list[i][0] + "." + list[i][2] + "?" + list[i][1])
		}
		return server+arr.join(",")
	};
	/**
	 * 执行单个模块
	 * @param  {String} mod  模块
	 * @param  {String} id   模块号
	 * @param  {String} type 类型
	 */
	var __execute = function(mod, id,type) {
		var obj = JSON.parse(mod);
		var fun = new Function("return " + obj.factory)();

		if(type == "m"){
			var module={exports:{}};
			fun.call(globle, null, globle, module);
			_mods[id]=module.exports;
			globle[id] && typeof(globle[id])=="function" && globle[id]();
		}else if(type=="t"){
			var module={exports:{}};
			var t = document.createElement('div');
			t.innerHTML = fun.call(globle, null, exports, module);
			var ss = t.getElementsByTagName('script');
			for(var i=0;i<ss.length;i++){
				new Function(ss[i].textContent)();
			}
			document.body.appendChild(t);
		}else{
			var module={exports:{}};
			var sty = document.createElement('style');
			sty.type="text/css";
			sty.innerHTML = fun.call(globle, null, exports, module);
			document.getElementsByTagName("head")[0].appendChild(sty);
		}
	};
	/**
	 * 执行所有传入类型的模块
	 * @param  {String} type 类型
	 */
	var _execute = function(type) {
		type=type||"m";
		var ret = [];
		if(type=="m"){
			for (var i = 0; i < exports.js.list.length; i++) {
				var path = exports.js.list[i].split('/')
				var _id = exports.js.list[i].match(/.*\/(.*)\?.*/)[1].split('.');
				_id.pop();
				var id = _id.join('.');
				var mod = localStorage.getItem("_"+type+"_" + id);
				try{
					mod && __execute(mod, id,type);
				}catch(err){
					ret.push([type,"_"+type+"_" + id]);
					break;
				}
			}
			return ret;
		}
		if(type=="s"){
			for (var i = 0; i < exports.css.list.length; i++) {
				var path = exports.css.list[i].split('/');
				var _id = exports.css.list[i].match(/.*\/(.*)\?.*/)[1].split('.');
				_id.pop();
				var id = _id.join('.');
				var mod = localStorage.getItem("_"+type+"_" + id);
				mod && __execute(mod, id,type);
			}
			return ret;
		}
		if(type=="t"){
			for (var i = 0; i < exports.html.list.length; i++) {
				var path = exports.html.list[i].split('/');
				var _id = exports.html.list[i].match(/.*\/(.*)\?.*/)[1].split('.');
				_id.pop();
				var id = _id.join('.');
				var mod = localStorage.getItem("_"+type+"_" + id);
				mod && __execute(mod, id,type);
			}
			return ret;
		}
	};
	/**
	 * 获取模块名
	 * @param  {String} str 路径
	 * @return {String}     模块名
	 */
	var _getModeName = function(str){
		var ls =str.match(/.*\/(.*)\?.*/);
		var arr = ls[ls.length-1].split('.');
		var ret = arr.pop();
		return arr.join('.');
	};
	/**
	 * 清除加载动画,
	 */
	var _clearLoading = function(){
		_emit("_clearLogin:"+_clearCount);
		var el = document.getElementById('loading');
		if(el){
			el.style.opacity=0;
			setTimeout(function () {
				el.parentNode && el.parentNode.removeChild(el);
			},300)
		}else{
			_clearCount++;
			if(_clearCount==1){
				setTimeout(arguments.callee,16);
			}else if(_clearCount==2){
				setTimeout(arguments.callee,100);
			}else if(_clearCount==3){
				setTimeout(arguments.callee,500);
			}else if(_clearCount==4){
				_clearCount=0;
				setTimeout(arguments.callee,2000);
			}else{
				_emit("..."+_clearCount);
			}
		}
	};
	/**
	 * 加载CSS
	 */
	var _initCss = function() {
		var fun = arguments.callee;
		var modes = [];
		for (var i = 0; i < exports.css.list.length; i++) {
			var path = exports.css.list[i].split('/')
			var ls = _getModeName(exports.css.list[i]);
			var ver = exports.css.list[i].split('?');
			var ext = exports.css.list[i].match(/.*\/(.*)\?.*/);
			if (_checkUpdate(ls, ver[ver.length - 1], true,"s")) {
				modes.push([ls, ver[ver.length - 1],  ext[ext.length - 1].split('.')[ ext[ext.length - 1].split('.').length-1]+".js", path.slice(0, path.length - 1).join('/')]);
			}
		}
		var urls = _getUrls(exports.css.url,modes);
		if (modes.length) {
			_get( urls, {
				onLoad: function() {
					_execute("s");
					_emit("onLoadCSSInit", arguments);
					exports.css.state=1;
					exports.css.onLoad("server",exports,modes);
					_checkOnLoad() && _onAllLoad();
				},
				onError: function() {
					_initCss.count++;
					if(_initCss.count==1){
						setTimeout(fun,16);
					}else if(_initCss.count==2){
						setTimeout(fun,100);
					}else{
						_emit("onErrorCSSInit"+_initCss.count);
					}
				}
			});
		} else {
			_execute("s");
			_emit("inLocalCSSInit", arguments);
			exports.css.state=1;
			exports.css.onLoad("local",exports);	
			_checkOnLoad() && _onAllLoad();
		}
	};
	_initCss.count=0;
	/**
	 * 加载JS
	 */
	var _initJS = function() {
		var fun = arguments.callee;
		var modes = [];
		for (var i = 0; i < exports.js.list.length; i++) {
			var path = exports.js.list[i].split('/')
			var ls = _getModeName(exports.js.list[i]);
			var ver = exports.js.list[i].split('?');
			var ext = exports.js.list[i].match(/.*\/(.*)\?.*/);
			if (_checkUpdate(ls, ver[ver.length - 1], true,"m")) {
				modes.push([ls, ver[ver.length - 1], ext[ext.length - 1].split('.')[ ext[ext.length - 1].split('.').length-1], path.slice(0, path.length - 1).join('/')]);
			}
		}
		var urls = _getUrls(exports.js.url,modes);
		if (modes.length) {
			_get(urls, {
				onLoad: function() {
					var ret = _execute("m");
					_emit("onLoadInitJS", arguments);
					exports.js.state=1;
					exports.js.onLoad("server",exports,modes);
					_checkOnLoad() && _onAllLoad();
				},
				onError: function() {
					_initJS.count++;
					if(_initJS.count==1){
						setTimeout(fun,16);
					}else if(_initJS.count==2){
						setTimeout(fun,100);
					}else{
						_emit("onErrorInitJS"+_initJS.count);
					}
				}
			});
		} else {
			var ret = _execute("m");
			if(ret.length){
				_emit("inLocalInitExecuteError", ret);
				localStorage.removeItem(ret[0][1]);
				_initJS();
				return;
			}
			_emit("inLocalInit", arguments);
			exports.js.state=1;
			exports.js.onLoad("local",exports);
			_checkOnLoad() && _onAllLoad();
		}
	};
	_initJS.count=0;
	/**
	 * 加载HTML
	 */
	var _initHTML = function(){
		var fun = arguments.callee;
		var modes = [];
		for (var i = 0; i < exports.html.list.length; i++) {
			var path = exports.html.list[i].split('/')
			var ls = _getModeName(exports.html.list[i]);
			var ver = exports.html.list[i].split('?');
			var ext = exports.html.list[i].match(/.*\/(.*)\?.*/);
			if (_checkUpdate(ls, ver[ver.length - 1], true,"t")) {
				modes.push([ls, ver[ver.length - 1], ext[ext.length - 1].split('.')[ ext[ext.length - 1].split('.').length-1]+".js", path.slice(0, path.length - 1).join('/')]);
			}
		}
		var urls = _getUrls(exports.html.url,modes);
		if (modes.length) {
			_get(urls, {
				onLoad: function() {
					_execute("t");
					_emit("onLoadHTMLInit", arguments);
					exports.html.state=1;
					exports.html.onLoad("server",exports,modes);
					_checkOnLoad() && _onAllLoad();
				},
				onError: function() {
					_initHTML.count++;
					if(_initHTML.count==1){
						setTimeout(fun,16);
					}else if(_initHTML.count==2){
						setTimeout(fun,100);
					}else{
						_emit("onErrorHTMLInit"+_initHTML.count);
					}
				}
			});
		} else {
			_execute("t");
			_emit("inLocaHTMLlInit", arguments);
			exports.html.state=1;
			exports.html.onLoad("local",exports);
			_checkOnLoad() && _onAllLoad();
		}
	};
	_initHTML.count = 0;
	_initHTML();
	_initJS();
	_initCss();
	new _Module("load", arguments.callee, _ver).save("m");
	document.cookie = "_m_load="+_ver;
})(window)