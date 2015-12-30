var fs = require("fs");
var path = require("path");
var hex = require("./hex");
var deps = require("./deps");
var lazylist = require("./lazylist");
var template = fs.readFileSync(path.join(__dirname, "template.js"), "utf8");
var modTemplate = fs.readFileSync(path.join(__dirname, "mod-template.js"), "utf8");

// 替换开头的分隔符
var prefixSepReg = new RegExp("^\\" + path.sep);

// 获取count个TAB键
function getTab(count){
	return new Array(count + 1).join("	");
}

module.exports = function(config, callback){
	// 入口文件
	var src = config.src || path.join(fs.realpathSync("."), "index.js");
	// 打包后的文件
	var dest = config.dest;
	// 打包完释放到全局的变量名
	var modName = config.name || "AllInOne";
	// 读文件方法
	var readFile = config.readFile || fs.readFile;
	// 入口文件所在目录
	var rootDir = path.dirname(src);

	// 注入方法列表
	var injectors = [];
	// 模块列表
	var modList = [];
	// 模块序列号
	var modIndex = 0;
	// 模块名与序列名的映射
	var modIdHash = {};
	// 模块状态
	var modStatus = {};

	function read(filepath, complete){
		var status;

		if(status = modStatus[filepath]){
			if(status.completed){
				complete();
			}else{
				status.readyList.push(complete);
			}
			return;
		}

		// 生成模块序列ID
		var modId = hex(modIndex ++);
		modIdHash[filepath] = modId;

		// 初始化模块状态
		status = modStatus[filepath] = {
			completed: false,
			readyList: [complete]
		};

		// 不带后缀的文件默认为js文件
		var ext = path.extname(filepath);
		readFile(filepath + (ext ? "" : ".js"), function(err, code, _injectors){
			if(err){
				throw err;
			}

			if(_injectors){
				_injectors.forEach(function(injector){
					if(injectors.indexOf(injector) === -1){
						injectors.push(injector);
					}
				});
			}

			code = code.toString("utf8");

			var dir = path.dirname(filepath);
			// 获取依赖
			var _deps = deps.get(code, dir);
			lazylist(_deps.map(function(dep){
				return function(callback){
					read(dep, callback);
				};
			}), function(){
				// 依赖模块全部完成之后将当前模块推入模块列表
				modList.push({
					id: modId,
					path: filepath,
					content: deps.replace(code, dir, modIdHash)
				});
				status.readyList.forEach(function(fn){
					fn();
				});
				status.completed = true;
			});
		});
	}

	read(src, function(){
		var data = {
				body: modList.map(function(code, index){
					return "\n" + getTab(1) + "// " + code.path.replace(rootDir, "").replace(prefixSepReg, "") + "\n" + modTemplate.replace(/\{\{(body|modId)\}\}/g, function(all, key){
						return {
							modId: code.id,
							body: code.content.split("\n").join("\n" + getTab(2))
						}[key];
					});
				}).join("\n"),
				globalName: modName,
				injectors: injectors.map(function(injector){
					return injector.split("\n").join("\n" + getTab(1));
				}).join("\n")
			};

		var code = template.replace(/\{\{(body|globalName|injectors)\}\}/g, function(all, key){
			return data[key];
		});

		if(dest){
			fs.writeFile(dest, code, function(err){
				if(err){
					throw err;
				}
			});
		}
		callback && callback(code);
	});
};