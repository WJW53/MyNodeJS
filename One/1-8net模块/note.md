# net模块

## 回顾HTTP

1. 普通模式：三次握手，请求、相应，四次挥手
2. 长连接模式(keep-alive)：在一段时间内，共用一个连接(请求多次)，就是告诉你，别那么快挂电话

## net模块能干什么

**net是一个通信模块**

利用它，可以实现：
1. 进程间的通信IPC(后端)
2. 网络通信TCP/IP

## 创建客户端

`net.createConnection(options[,connectListener]);`**这只是建立连接,传输数据的通道!!**

**它会返回socket**

1. **socket是一个特殊的文件**：负责向网卡输送内容
2. **在node中表现为一个双工流(可读写)对象**
3. 通过向流写入内容发送请求数据(socket.write())
4. 通过监听流的内容获取响应数据(socket.on("data",func))
5. socket.end();挂断连接了

根据请求头里Content-Length知道响应字符串总共多少字节

