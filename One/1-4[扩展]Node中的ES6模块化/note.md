# 1-4. 【扩展】Node中的ES6模块化

大约2018.10, node开始支持es6模块化, 但直到现在(2020)还不太成熟,

- 目前, Node中的ES6模块化仍处于试验阶段
- 模块化呢, 要么是CommonJS, 要么是ES6模块化
    - CommonJS:
        - 默认情况下都是 CommonJS
    - ES6: 
        - 【推荐】文件后缀名为`.mjs`
        - 最近的package.json中的`type设置为module`(**这样的话,整个工程都得使用ES6模块化了,这就不太好了**)


- 当使用ES6模块化运行时, 必须添加: `--experimental-modules` 标记
> 例如:**在package.json的"scripts"的脚本中配置: `"start" : "node --experimental-modules index.mjs"`**然后,对应目录下输入命令: `npm start`

## 使用index.mjs时注意：
- 不能在.mjs中用module.exports了,会报错ReferenceError: module is not defined
  因为ES6不像Commonjs一样在函数环境下执行了,没有传module这个参数.ES6模块化就是利用引擎内部实现的

- 也不能在引入的.js中使用export导出(它得在.mjs中), 会报SyntaxError

- 在.js中是可以利用module.exports;它会被认为是ES6模块化的默认导出

- **始终牢记,require会把模块内容放到一个独立的函数中执行**

- 异步方式加载
```js
//通过异步的方式动态的加载
import("./a.mjs").then(r => console.log(r));
```

了解一下, 等它强大起来了再说

目前也就webpack能较为轻松的解决模块化的兼容性问题..