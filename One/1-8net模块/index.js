const net = require("net");
const socket = net.createConnection({
    host: "duyi.ke.qq.com",
    port: 80,//必须有值
}, () => {
    console.log('连接成功');
});//这里只是建立连接通道,还没请求呢

// socket.on("data", chunk => {
//     console.log('来自服务器的消息: ', chunk.toString("utf-8"));
//     socket.end();//直接放到这里时,可能最后一块消息是传不完的,根据请求头里Content-Length知道总共多少字节
// });

// socket.write("你好");//400 Bad Request,因为发送的不是HTTP协议格式的字符串,我们这是普通字符串
//http协议格式: 请求行\n请求头\n\n请求体  ,请求体可以不传但是两个换行必须有!!
//如果没有两个换行,那连接通道还在开着,服务器还在等着客户端发送请求呢
//GET就是在请求行中

socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`);

function isOver() {
    const allContentLength = +receive.header["Content-Length"];//需要接受消息体的总字节数
    const curReceivedLength = Buffer.from(receive.body, "utf-8").byteLength;
    console.log(allContentLength, curReceivedLength);
    return curReceivedLength > allContentLength;//true:还没结束
}

let receive = null;
socket.on("data", chunk => {
    const response = chunk.toString("utf-8");
    if (receive === null) {//第一次
        receive = parseResponse(response);
        if (isOver()) {
            socket.end();
        }
        return;
    } else {
        console.log('继续接收数据',response);
        receive.body += response;
        if (isOver()) {
            socket.end();
            return;
        }
    }
});

socket.on("close", () => {
    console.log(receive.body);
    console.log('结束了!!');
});

/**
 * 提炼出相应字符串的消息头和消息体
 * @param {*} response
 */
function parseResponse(response) {
    const index = response.indexOf("\r\n\r\n");
    console.log(index);
    const head = response.substring(0, index);
    const body = response.substr(index + 4);
    const headParts = head.split("\r\n");
    const headerArray = headParts.slice(1).map(str => {
        return str.split(":").map(s => s.trim());
    });
    const header = headerArray.reduce((a, b) => {
        a[b[0]] = b[1];
        return a;
    }, {});
    console.log('head', header);
    console.log('body', body);

    return {
        header,
        body,
    }
}