var path = require("path");

// 解析模块依赖
var REQUIRE_RE = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g
var SLASH_RE = /\\\\/g

module.exports = {
	get: function(code, dir) {
		var deps = [];

		code.replace(SLASH_RE, "")
			.replace(REQUIRE_RE, function(m, m1, m2) {
				if (m2) {
					deps.push(path.join(dir, m2));
		    	}
			});

		return deps;
	},
	replace: function(code, dir, codeHash){
		return code.replace(SLASH_RE, "____placeholder____")
			.replace(REQUIRE_RE, function(m, m1, m2) {
				if(m2){
		    		return m.replace(m2, codeHash[path.join(dir, m2)]);
				}else{
					return m;
				}
			})
			.replace(/____placeholder____/g, "\\\\");
	}
};