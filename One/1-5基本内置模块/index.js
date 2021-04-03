// const os = require("os");
// console.log(os.EOL);
// console.log(os.arch());
// console.log(os.cpus().length);
// console.log(os.freemem() / (1024**3));//还剩9.512GB可用
// console.log(os.homedir());//C:\Users\hp
// console.log(os.hostname());//DESKTOP-K3CCMKV
// console.log(os.tmpdir());//C:\Users\hp\AppData\Local\Temp



// const path = require("path");
// const basename = path.basename("sad/dafs/asf/das/a.html", ".html");
// console.log(basename);//a   因为后面的.html被匹配掉了
// console.log(path.sep);//windows下的分隔符是右分隔符  \

// console.log(process.env.PATH.split(path.delimiter));

//不会做路径检查!!
// const dir = path.dirname("a/b/c/d.js");
// console.log(dir);
// const ext = path.extname("a/b/c/a.js");
// console.log(ext);//.js

// const basePath = "a/b";
// // const fullpath = path.join("a", "b", "c", "../", "d.js");
// const fullpath = path.join(basePath, "c", "../", "d.js");
// console.log(fullpath);//a\b\d.js
// console.log(path.resolve(__dirname,"./a.js"));



// const URL = require("url");.

// // new URL.URLSearchParams();
// const url = new URL.URL("https://nodejs.org/dist/latest-v12.x/docs/api/url.html");
// const obj = {
//     href: 'https://nodejs.org/dist/latest-v12.x/docs/api/url.html',
//     origin: 'https://nodejs.org',
//     protocol: 'https:',
//     username: '',
//     password: '',
//     host: 'nodejs.org',
//     hostname: 'nodejs.org',
//     port: '',
//     pathname: '/dist/latest-v12.x/docs/api/url.html',
//     search: '',
//     searchParams: {},
//     hash: ''
// }
// console.log(url);
// console.log(url.searchParams.has("a"));
// console.log(URL.format(obj));


const util = require("util");

function delay(duration = 1000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(duration);
        }, duration);
    });
}
const delayCallback = util.callbackify(delay);
// delay(500).then(d => {
//     console.log(d);
// });
delayCallback(500, (err, data) => {
    console.log(data);
});


function myDelayCallBack(duration, callback) {
    setTimeout(() => {
        callback(null, duration);
    }, duration);
}

const myDelay = util.promisify(myDelayCallBack);
// myDelay(700).then(d => { console.log(d); });
(async () => {
    const r = await myDelay(800);
    console.log(r);
})();


const obj1 = {
    a: 1,
    b: {
        c: 3,
        d: {
            e: 5
        }
    }
}

const obj2 = {
    a: 1,
    b: {
        c: 3,
        d: {
            e: 5
        }
    }
}

console.log(util.isDeepStrictEqual(obj1,obj2));