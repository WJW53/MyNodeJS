module.exports.c = 15;//这样会被认为是ES6模块化的默认导出
exports.a = 5;
exports.b = 3;


//不能和module.exports混用
//使用export的时候,文件需要用.mjs后缀名
//那调用的时候就不能用require了,因为export不在函数环境中
//得用import
// export default 5;
// export const a = 1;