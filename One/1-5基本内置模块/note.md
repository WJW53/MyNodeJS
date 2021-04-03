# 1-05. 基本内置模块
具体去看官网

## os
EOL:    一行结束的分隔符,不同的操作系统中是不同的\n or \r\n(windows)
arch(): 获取cpu的架构名, x32、x64等 
**cpus()**: cpu的一些信息,返回值是数组
freemem(): 当前剩下多少内存可用,单位是字节Byte
homedir(): 获取用户目录
hostname(): 获取主机名
**tmpdir()**: 获取操作系统的临时目录(就是保存临时文件的目录)


## path(常用)
**path的属性方法,都不会对输入的路径做路径检查,它只是放到字符串分析中,再取出对应的值**

basename(路径): 也就是获取整个路径里面的最后一个文件
sep: unix是左分隔符/, windows是右分隔符\
delimiter: windows中操作系统中的环境变量是用分号;分隔, 而Unix中是用冒号:
dirname(路径): 返回它的目录路径
extname(路径): 得到它的后缀名, 没有后缀名就是空字符串
**join()**: 把多段路径拼接成一个路径
normalize(): 给它一个完整的路径,它会将其规范化(比如给了../返回上一级,以及windows中转为反斜杠\\)
relative(): 两个路径,返回右边的路径相对于左边路径的路径
**resolve()**: 得到绝对路径,`/`代表当前盘符,`./`代表`process.pwd`的值,如果想要相对于我们当前模块的目录下
    则使用`path.resolve(__dirname,"./a.js");`


## url
它的属性方法为：
`const URL = require("url");`

let url = new URL.URL("一个url"): 转换为一个URL对象,或者用 URL.parse("一个URL)
URL.format(obj): 将obj(它本身是个URL对象)其格式化为一个url

更多的用法查API


## util
它的属性方法为：

promisify(): 参数是函数,返回一个Promise
callbackify(): 参数是函数, 返回结果是一个新函数
inherits(子类,父类): 就是继承
isDeepStrictEqual(obj1,obj2): 将两个对象的属性进行深度且严格地比较