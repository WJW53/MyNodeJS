const net = require("net");
const server = net.createServer();
const fs = require("fs");
const path = require("path");

server.listen(9527);//服务器监听9528端口

server.on("listening", () => {
    console.log('server listen 9527');
});

server.on("connection", socket => {
    console.log('有客户端连接到服务器');//为什么最开始有两个连接呢,因为在开始前有个测试连接


    socket.on('data', async chunk => {
        console.log("http请求", chunk.toString("utf-8"));
        const filePath = path.resolve(__dirname, "./hsq.jpg");
        const bodyBuffer = await fs.promises.readFile(filePath);
        const headBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`, "utf-8");
        const result = Buffer.concat([headBuffer, bodyBuffer]);
        socket.write(result);


        //         socket.write(`HTTP/1.1 200 OK
        // Content-Type: text/plain

        // <!DOCTYPE html>
        // <html lang="en">
        // <head>
        //     <meta charset="UTF-8">
        //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <title>Document</title>
        // </head>
        // <body>
        //     <h1>你好啊!</h1>
        // </body>
        // </html>        `);
        socket.end();//我响应完了
    });


    socket.on("end", () => {
        console.log('连接关闭了');
    });
});
