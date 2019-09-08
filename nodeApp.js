// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appID: "app-id"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var path = require('path');
var http = require('http');
var fs = require('fs');
var dir = path.join(__dirname, 'public');

const hostname = '127.0.0.1';
const port = 3000;
const CONTENT_PAGE_REGEX = /^u\/$/;
const indexPageUrl = 'index.html';
const pageNotFoundUrl = 'notFound.html';
const INDEX_PAGE_REGEX = /^(index|home|liang|)$/;
const RESOURCE_REGEX = /^.*\.(jpg|gif)$/;
var mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

var serveIndexPage = function (resp) {
  servePage(indexPageUrl,resp);
}
var serve404Page = function (resp) {
  servePage(pageNotFoundUrl,resp);
}
var servePage = function (url,resp) {
  fs.readFile(url, function (error, pgResp) {
    if (error) {
      resp.writeHead(404);
      resp.write('Contents you are looking are Not Found');
    } else {
      resp.writeHead(200, {
        'Content-Type': 'text/html'
      });
      resp.write(pgResp);
    }
    resp.end();
  });
}
var serveResource = function (url,resp) {
  fs.readFile(url, function (error, pgResp) {
    if (error) {
      resp.writeHead(404);
      resp.write('Contents you are looking are Not Found');
    } else {
      resp.writeHead(200, {
        'Content-Type': 'text/html'
      });
      resp.write(pgResp);
    }
    resp.end();
  });
}

const server = http.createServer((req, res) => {
  headers=req.headers;
  method=req.method;
  url=req.url;
  var reqpath = req.url.toString().split('?')[0];
  if(method=='GET'||method=='POST'){
    var body = [];
    var urlStr = "url:" + url;
    console.log(urlStr);
    var file = path.join(dir, reqpath.replace(/\/$/, urlStr));
    console.log(file);

    if (file.indexOf(dir + path.sep) !== 0) {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Forbidden');
    }
    var type = mime[path.extname(file).slice(1)] || 'text/plain';
    var s = fs.createReadStream(file);
    s.on('open', function () {
        res.setHeader('Content-Type', type);
        s.pipe(res);
    });
    s.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    });
  }else{
    response.statusCode = 501;
    response.setHeader('Content-Type', 'text/plain');
    return response.end('Method not implemented');
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
