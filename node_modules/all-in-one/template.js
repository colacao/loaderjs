;(function(main){
	window["{{globalName}}"] = main;
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

	{{injectors}}
	
	{{body}}

	return require("0");
})());