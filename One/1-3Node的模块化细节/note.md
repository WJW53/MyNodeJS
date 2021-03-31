# Node的模块化细节

## 模块的查找

1. 绝对路径(里面要用两个反斜线`\\`)
2. 相对路径./ 或 ../开头
    - 1.相对于当前模块
    - 2.转换为绝对路径
    - 3.加载模块

3. 相对路径(不以./或../开头)
    - 1.先检查是否是内置模块,如：fs、path等
    - 2.检查当前目录中的node_modules(文件、子目录,入口(在package.json中的main字段中配置,默认index.js))
    - 3.检查上级目录中的node_modules(同上)
    - 4.转换为绝对路径
    - 5.加载模块

4. 关于后缀名
    - 如果不提供后缀名, 则自动补全
    - `顺序为: js、json、node、mjs`


5. 关于文件名
    - **`如果仅提供目录, 不提供文件名, 则自动寻找该目录中的index.js`**
    - **`package.json中的main字段`**
        - 表示包的默认入口
        - 导入或执行包时若仅提供目录, 则使用main补全入口
        - 默认值为index.js


## module对象

**记录了当前模块的各种信息**

id: 当前模块的绝对路径
parent: 现在是哪个模块在用它,就是它的父模块
loaded: 当前模块是否加载完毕

## require函数

`require.resolve("相对路径");`//返回它的入口模块的绝对路径

require.cache可以看到当前模块缓存了哪些依赖模块
`当执行一个模块或使用require时, 会将模块放置在一个函数环境中`

## 面试题

**总之先记着一点, CommonJS模块化模块最后导出的是module.exports所指向的对象**

**故,若module.exports指向了一个新的对象的那话,那就断开了它与exports和this的联系**
```js
//require伪代码实现
function require(modulePath) {
    //由于我更改了我的目录,所以已经不再是下述的目录了
    //1. 将modulePath转换为绝对路径: C:\\WebNotes\\WebToFrontEnd\\20.NodeJS\\One\\1-3\\myModule.js
    //2. 判断是否该模块已有缓存
    // if(require.cache["C:\\WebNotes\\WebToFrontEnd\\20.NodeJS\\One\\1-3\\myModule.js"]){
    //     return require.cache[
    //         "C:\\WebNotes\\WebToFrontEnd\\20.NodeJS\\One\\1-3\\myModule.js"
    //     ].result;
    // }

    //3. 如果没有缓存: 就读取文件内容
    //4. 把内容包裹到一个函数中
    function __temp(module, exports, require, __dirname, __filename) {
        console.log("当前模块路径: ", __dirname);
        console.log("当前模块文件路径: ", __filename);

        exports.c = 3;
        module.exports = {
            a: 1,
            b: 2
        }
        this.m = 5;
        //这也会导出:
        //{ a: 1, b: 2 }
    }

    //6. 创建module对象
    module.exports = {};
    const exports = module.exports;
    //使用call,绑定对象
    __temp.call(module.exports, module, exports, require, module.path, module.filename);
    //所以在最开始的时候,没有操作this,exports,module.exports时,他们仨是相同的
    //但是操作后,..那很可能就不一样了
    //缓存该模块
    //7. 最后 
    return module.exports;
}
```