const fs = require("fs");
const path = require("path");
const { Readable, Writable } = require("stream");

//方式一,占用内存比较大
async function method1() {
    const from = path.resolve(__dirname, "./temp/bcd.txt");
    const to = path.resolve(__dirname, "./temp/bcd2.txt");
    console.time('方式1');
    const content = await fs.promises.readFile(from);
    await fs.promises.writeFile(to, content);
    console.timeEnd('方式1');
    console.log('复制完成');
}
// method1();

//方式2
async function method2() {
    const from = path.resolve(__dirname, "./temp/bcd.txt");
    const to = path.resolve(__dirname, "./temp/bcd3.txt");
    console.time('方式2');

    const rs = fs.createReadStream(from);
    const ws = fs.createWriteStream(to);

    rs.pipe(ws);//这一行代码其实就是下面代码的封装实现

    rs.on("close", () => {
        console.timeEnd('方式2');
        console.log('复制完成');
    });

    // rs.on("data", chunk => {
    //     //读一部分,就写一部分
    //     const flag = ws.write(chunk);//每次一个chunk,默认64KB
    //     if (flag === false) {
    //         //表示下一次写入,会造成背压;所以暂时不要再读了
    //         rs.pause();//暂停读取
    //     }
    // });

    // ws.on("drain", () => {
    //     //可以继续写了
    //     rs.resume();
    // });

    // rs.on("close", () => {
    //     //读完了
    //     ws.end();//完毕写入流??不对吧,应该还有东西没写完吧
    //     console.timeEnd('方式2');
    //     console.log('复制完成');
    // });
}
method2();//方式二在时间和空间上都更优