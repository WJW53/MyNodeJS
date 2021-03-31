// console.log(window);//ReferenceError: window is not defined

// console.log(global);
// const timer = setTimeout(() => { }, 1000);
// console.log(timer);//timer是个对象了

// const timer2 = setImmediate(() => {
//     console.log('abc');
// }, 0);

// console.log(__dirname);//c:\WebNotes\WebToFrontEnd\20.NodeJS\One\1-2
// console.log(__filename);//c:\WebNotes\WebToFrontEnd\20.NodeJS\One\1-2\index.js


// let buffer = Buffer.from("abcdefg", "utf-8");
// console.log(buffer);//<Buffer 61 62 63 64 65 66 67>     
// //这其实是两位的16进制,表示了一个字节  (61)16进制 === (97)10进制 === 'a'(ascll里的a)

// console.log(global.process);
console.log('当前命令行', process.cwd());


// setTimeout(()=>{
//     console.log('abc');
// },1000);
// process.exit();//这样就不会打印abc了


console.log(process.argv);//比如我输入,node index a b c d

console.log(process.platform);//win32 并不是说电脑是32位的

process.kill(12672);//我Google Chrome进程就被关闭了

// console.log(process.env);
