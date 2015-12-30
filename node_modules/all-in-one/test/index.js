var fs = require("fs");
var path = require("path");
var allinone = require("../index");

allinone({
	name: "xxx",
	src: path.join(fs.realpathSync("."), "src", "index.js"),
	dest: path.join(fs.realpathSync("."), "dist", "index.js")
});