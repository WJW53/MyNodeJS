const fs = require("fs");
const path = require("path");
const filename = path.resolve(__dirname, "./myfiles/谢尔比.jpg");
const dirname = path.resolve(__dirname, "./myfiles/");
const dirname1 = path.resolve(__dirname, "./myfiles/1");
const dirname3 = path.resolve(__dirname, "./myfiles/3");

// async function test(){
//     const stat = await fs.promises.stat(filename);
//     console.log(stat);
//     let t1 = new Date(stat.birthtime).toLocaleDateString();
//     console.log(t1);
//     console.log(stat.isDirectory());
//     console.log(stat.isFile());
// }
// test();

// async function test1() {
//     const pathes = await fs.promises.readdir(dirname);
//     console.log(pathes);

//     await fs.promises.mkdir(dirname1);
//     console.log('创建目录成功!');
// }
// test1();


async function exists(filename) {
    try {
        await fs.promises.stat(filename);
        return true;
    } catch (error) {
        console.log(error);
        if (error.code === "ENOENT") {
            //文件不存在
            return false;
        }
        throw error;
    }
}

async function test2() {
    let flag = await exists(dirname3);
    if (flag) {
        console.log('目录已存在,无需操作');
    } else {
        await fs.promises.mkdir(dirname3);
        console.log('目录创建成功');
    }
}

test2();