// import * as obj from "./a.mjs";

//这俩写法对应commonjs
import * as obj from "./a.js";
// import obj from "./a.js";//默认obj是default

//如果a.js用了export导出,那这里
// require("./a.js");//就会报错,因为export不是包裹在函数环境中


console.log(obj);//[Module] { default: { c: 15, a: 5, b: 3 } }

//npm start
//通过异步的方式动态的加载
import("./a.mjs").then(r => console.log(r));//得到以下输出
// (node:15632) ExperimentalWarning: The ESM module loader is experimental.
// [Module] { a: 1, default: 5 }