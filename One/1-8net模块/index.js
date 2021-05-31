const net = require("net");
const socket = net.createConnection({
    host: "duyi.ke.qq.com",
    port: 80,//必须有值
}, () => {
    console.log('连接成功');
});//这里只是建立连接通道,还没请求呢

socket.on("data", chunk => {
    console.log('来自服务器的消息: ', chunk.toString("utf-8"));
    socket.end();//直接放到这里时,可能最后一块消息是传不完的,根据请求头里Content-Length知道总共多少字节
});

// socket.write("你好");//400 Bad Request,因为发送的不是HTTP协议格式的字符串,我们这是普通字符串
//http协议格式: 请求行\n请求头\n\n请求体  ,请求体可以不传但是两个换行必须有!!
//如果没有两个换行,那连接通道还在开着,服务器还在等着客户端发送请求呢
//GET就是在请求行中

socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`);


/**
 * 提炼出相应字符串的消息头和消息体
 * @param {*} response
 */
function parseResponse(response){
    
}