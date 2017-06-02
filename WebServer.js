//node.js Web服务器
//-----------------------------------------------------------
//请求模块
var Http = require('http');
var Url = require('url');
var Fs = require('fs');
var Path = require('path');

//依据路径返回内容类型字符串，用于http响应头
function getContentType(filePath) {
    var contentType = '';

    //使用路径解析模块获取文件扩展名
    var ext = Fath.extname(filePath);

    switch (ext) {
        case '.html':
            contentType = 'text/html';
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".ico":
            contentType = "image/icon";
            break;
        default:
            contentType = "application/octet-stream";
    }

    //返回内容类型字符串
    return contentType;
}

//Web服务器主函数，解析请求，返回Web内容
function WebServer(req, res) {
    //获取请求的url
    var reqUrl = req.url;

    //控制台输出请求路径
    console.log(reqUrl);

    //使用url解析模板回去url内容
    var pathName = Url.parse(reqUrl).pathName;

    if (Path, extname(patnName === '')) {
        //如果没有扩展名
        pathName += ''; //指定访问目录
    }
    if (pathName.charAt(pathName.length - 1) === '/') {
        //如果访问目录
        pathName += 'index.html'; //指定为默认网页
    }


    //使用路径解析模块，组装实际文件路径
    var filePath = libPath.join("./WebRoot", pathName);

    //判断文件是否存在
    Fs.exists(filePath, function(exists) {
        //文件存在
        if (exists) {
            //在响应头写入内容类型
            res.writeHead(200, {
                'contentType': getContentType(filePath)
            });

            //创建只读流用于返回
            var stream = Fs.createReadStream(filePath, {
                flags: 'r',
                encoding: null
            });

            //指定如果流读取错误，返回404错误
            stream.on('error', function() {
                res.writeHead(404);
                res.end('<h1>404 Read Error</h1>');
            });

            //连接文件流和http返回流的管道，用于返回实际Web内容
            stream.pipe(res);
        } else {
            //文件不存在，返回404错误
            res.writeHead(404, {
                "Content-Type": "text/html"
            });
            res.end("<h1>404 Not Found</h1>");
        }
    });
}

//创建一个http服务器
var webSvr = Http.createServer(WebServer);

//指定服务器错误事件响应
webSvr.on('error', function(error) {
    console.log(error);
});

//监听端口
webSvr.listen(8080, function() {
    console.log('WebServer is running');
});
