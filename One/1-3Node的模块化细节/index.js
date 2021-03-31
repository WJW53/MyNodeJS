// console.log(__filename);
// const ajson = require("c:\\WebNotes2\\MyNodeJS\\One\\1-3Node的模块化细节\\a.json");
// console.log(ajson);
// require("./a.js");

// require("abc");

// const result = require("./a");//找不到a.js就会找a.json
// console.log(result);


// require("./src");//先找本目录下的这个文件,没找到,发现是个目录,然后默认调用它下面的index.js


//先在node_modules目录下加个/abc/dist/index.js文件,然后在abc文件夹下npm init
// require("abc");//module abc/dist/abc.js

// require("ab");//node_modules ab.js
// require("./src");

//返回它的入口模块的绝对路径
// console.log(require.resolve("./src"));
// console.log(require.cache);//缓存了哪些模块


const result = require("./myModule.js");
console.log(result);
