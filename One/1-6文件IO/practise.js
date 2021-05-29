const fs = require("fs");
const path = require("path");

class File {
    constructor(filePath, name, ext, isFile, size, createTime, updateTime) {
        this.filePath = filePath;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    async getContent(isBuffer = false) {
        if (this.isFile) {
            if (isBuffer) {
                return await fs.promises.readFile(this.filePath);
            } else {
                return await fs.promises.readFile(this.filePath, {
                    encoding: "utf-8",
                });
            }
        }
        return null;//因为这里是目录
    }

    async getChildren() {
        if (this.isFile) {
            return [];//普通文件不可能有子文件或目录
        } else {
            let children = await fs.promises.readdir(this.filePath);
            // console.log(children);
            children = children.map(name => {
                const result = path.resolve(this.filePath, name);//拼接路径
                return File.getFile(result);//因为result是Promise
            });
            return Promise.all(children);
        }

    }

    //只要给我路径,我就帮你创建一个File对象
    static async getFile(filePath) {
        const stat = await fs.promises.stat(filePath);
        const name = path.basename(filePath);
        const ext = path.extname(filePath);
        const isFile = stat.isFile();
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime);

        return new File(filePath, name, ext, isFile, size, createTime, updateTime);
    }
}


async function readDir(dirname) {
    const file = await File.getFile(dirname);
    console.log(file);
    return await file.getChildren();
}

/**
//         [
//             {name:"1",isFile:false,ext:"",size:0,getChildren:fn,...},
//             {name:"谢尔比.jpg",isFile:true,ext:".jpg",size:xxx,getChildren:fn,...},

//         ]
//      */

async function test() {
    const filePath = path.resolve(__dirname, "./myfiles/2.txt");
    const file = await File.getFile(filePath);
    console.log(file);
    console.log(await file.getContent());
    console.log(await file.getChildren());

    // const dirname = path.resolve(__dirname, "./myfiles");
    // const result = await readDir(dirname);
    // console.log(result);
    // const datas = await result[0].getChildren();
    // console.log(datas);
}


test();