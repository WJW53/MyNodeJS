const fs = require("fs");
const path = require("path");
const { Readable, Writable } = require("stream");
const filePath = path.resolve(__dirname, "./temp/bcd.txt");
const ws = fs.createWriteStream(filePath, {
    flags: "a",
    encoding: "utf-8",
    highWaterMark: 16*1024,
});

// const flag = ws.write("啊");
// console.log(flag);

// //总共写10MB的数据,因为内存积压 --> 背压问题,导致可能报错
// for (let index = 0; index < 1024 * 1024 * 10; index++) {
//     ws.write("a");
// }

let i = 0;
//一直写,直到达到 通道填满 或 写完了
function write() {
    let flag = true;
    while (i < 1024 * 1024 * 10  && flag) {
        flag = ws.write("a");//写入a后,得到下一次是否还能直接写
        i++;
    }
}

write();

ws.on("drain",()=>{
    // console.log('可以再次写入了');
    write();
});