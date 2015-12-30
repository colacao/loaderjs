;(function(main){
	window["xxx"] = main;
})((function(){
	var mods = {};
	function require(id){
		return mods[id];
	}
	function define(id, factory){
		var module = {exports: {}};
		factory(require, module.exports, module);
		mods[id] = module.exports;
	}
	
	// b.js
	define("3", function(require, exports, module){
		module.exports = "b";
	});

	// a
	define("1", function(require, exports, module){
		var b = require("3");
		
		module.exports = "a";
	});

	// c
	define("2", function(require, exports, module){
		var a = require("1");
		
		module.exports = "c";
	});

	// index.js
	define("0", function(require, exports, module){
		var a = require("1");
		var c = require("2");
		
		module.exports = "index";
	});

	return require("0");
})());