'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var allInOne = require('all-in-one');
var fs = require("fs");
var path = require("path");
var Injectors = {
    "css": fs.readFileSync(path.join(__dirname, "injector/css.js"), "utf8")
};

function transStr(str){
    return "'" + str.replace(/\\/g, "\\\\").replace(/'/g, "\\\'").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t") + "'";
}

module.exports = function (name, readFile) {
    return through.obj(function (chunk, enc, callback) {
        if (chunk.isNull()) {
            this.push(chunk);
            return callback();
        }

        if (chunk.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }

        if (chunk.history.length !== 1) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Must first'));
            return callback();
        }

        allInOne({
        	name: name,
        	src: chunk.history[0],
            readFile: readFile ? function(filepath, callback){
                readFile(filepath, function(config){
                    config = config || {};

                    return through.obj(function(chunk, enc, _callback){
                        var content = chunk.contents.toString("utf8");
                        var injectors = [];

                        switch(config.type){
                            case "style":
                                content = 'module.exports = $all_in_one_css_injector(' + transStr(content) + ');';
                                injectors.push(Injectors["css"]);
                                break;
                            case "text":
                                content = 'module.exports = ' + transStr(content) + ';';
                                break;
                        }

                        callback(null, new Buffer(content), injectors);

                        this.push(chunk);
                        return _callback();
                    });
                });
            } : null
        }, function(content){
        	chunk.contents = new Buffer(content);
        	this.push(chunk);
        	callback();
        }.bind(this));
    });
};