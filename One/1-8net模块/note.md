# net模块

## 回顾HTTP

1. 普通模式：三次握手，请求、相应，四次挥手
2. 长连接模式(keep-alive)：在一段时间内，共用一个连接(请求多次)，就是告诉你，别那么快挂电话

## net模块能干什么

**net是一个通信模块**

利用它，可以实现：
1. 进程间的通信IPC(后端)
2. 网络通信**TCP/IP**

我们这里拿http模拟实验，TCP/IP不好找啊

## 创建客户端

`net.createConnection(options[,connectListener]);`**这只是建立连接,传输数据的通道!!**

**它会返回socket**

1. **socket是一个特殊的文件**：负责向网卡输送内容
2. **在node中表现为一个双工流(可读写)对象**
3. 通过向流写入内容发送数据(socket.write())
4. 通过监听流的内容获取数据(socket.on("data",func))
5. socket.end();挂断连接了

根据请求头里Content-Length知道响应字符串总共多少字节

## 创建服务器

`net.createServer();`

**返回一个server对象**

1. server.listen(port);监听当前计算机中某个端口
2. server.on("listening",()=>{});开始监听端口后触发的事件
3. server.on("connection",socket=>{});
    - **当某个连接到来时，触发该事件**
    - **事件的监听函数会获得一个socket(每个连接都会产生一个socket)对象作为参数传进来**


## 一般不用net搭服务器，因为麻烦，但是要了解是怎么回事儿
