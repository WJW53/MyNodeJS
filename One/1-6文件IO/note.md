# 文件I/O

## I/O

对外部设备的输入输出

外部设备：磁盘、网卡、显卡、打印机、其他等等

IO的速度往往低于内存和CPU的交互速度

建议工作几年后,看这本书 <<现代操作系统>> (看原版英文版的,因为中文翻译的不好)

## fs模块

除了在require中写`./`是相对当前目录下的路径,**在其他地方写的都是相对于命令提示符的当前路径的!!**

1. 读取一个文件fs.readFile/fs.readFileSync(这个是同步读取,意思就是必须等待它完成)
**fs.readFileSync是同步的,会导致JS运行阻塞,极其影响性能**,通常,在程序启动时运行有限的次数即可

- fs.promises.readFile();返回一个promise,这是在ES6出来之前

2. 向文件写入内容fs.writeFile,**追加内容就配配置{flag:"a",}**,写入的内容也可以是Buffer格式
3. `获取文件或目录信息fs.stat`
    - size:占用的字节数(`目录本身也是一个文件,存着一些指向其他文件的指针而已`)
    - atime:上次访问时间
    - mtime:上次文件内容被修改的时间
    - ctime:上次文件状态被修改的时间,比如文件的权限变了
    - birthtime:文件创建时间
    - isDirectory(),是不是目录
    - isFile()是不是文件

4. 获取目录中的文件和子目录`fs.readdir`,是一个数组,存着那些文件/子目录名字
5. 创建目录fs.mkdir
6. 判断文件或目录是否存在fs.exists(**过时了,用fs.stat(/fs.access()代替**)
7. **删除文件fs.unlink(path[,options])**


一般是先判断目录存不存在,存在的话,在它下面创建文件,不存在的话,就创建目录

## 练习：读取一个目录中的所有子目录和文件

**每一个目录或文件都是对象**

### 属性
name : 文件名
ext : 后缀名
isFile: 是否是有一个文件
size: 文件大小
createTime: 日期对象,创建时间
updateTime: 日期对象,修改时间


### 方法
getChildren(): 得到目录的所有子文件对象,如果是文件,则返回空数组

getContent(isBuffer=false): 读取文件内容,如果是目录,则返回null
