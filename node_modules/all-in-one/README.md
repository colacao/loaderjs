# all-in-one
指定入口文件，将遵循commonjs规范的所有依赖文件打包进一个文件中（常用于浏览器端框架文件的打包）

## 安装
```bash
npm install all-in-one
```
## 使用
```javascript
var allInOne = require("all-in-one");

allInOne({
    // 打包完之后释放到全局下的变量名[可选]
    "name": "XXX",
    // 入口文件
    "src": "src/index.js",
    // 打包后的文件[可选]
    "dest": "dist/index.js"
}, function(code){ // 打包完之后的回调函数[可选]
    // 打包后的源代码
    console.log(code);
});
```
