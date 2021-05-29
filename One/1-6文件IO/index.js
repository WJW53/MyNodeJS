const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./myfiles/1.txt");
// fs.readFile(filename,{});//第二个参数是配置对象
// fs.readFile(filename, (err, content) => {
//     console.log(content);//<Buffer 73 75 69 62 69 61 6e 62 61>  本质是2进制,只是转换为了16进制
//     console.log(content.toString("utf-8"));
// });
fs.readFile(filename, {
    encoding: "utf-8",
}, (err, content) => {
    console.log(content);
});//为什么要用回调函数?因为读写IO时间太久了,所以需要异步
console.log('这肯定先打印');

//fs.readFileSync是同步的,会导致JS运行阻塞,极其影响性能