'use strict';

var url = require('url');
var http = require('http');
var HtmlRender = require('./htmlRender').htmlRender;
var File = require('./File').File;
var path = require('path');

class App {
  constructor(config) {
    config = config || {};
    this.static = config['static'] || "./static";
    this.urlMap = config['urlMap'] || {};
    this.urlMap['^/static'] = this.staticHandler;
    this.urlRegFlag = {'^/static' : 'g'};
    this.methodMap = {'^/static': ['GET']};
    this.urlReg = {'^/static' : true};
    return this;
  }

  register(myUrl, handler, method) {
    if (!handler) return;
    if (myUrl instanceof RegExp) {
      this.urlRegFlag[myUrl.source] = myUrl.flags;
      this.urlReg[myUrl.source] = true;
      myUrl = myUrl.source;
    }
    method = method instanceof Array ? method : [method];
    this.methodMap[myUrl] = method;
    this.urlMap[myUrl] = handler;
  }

  mainHandler(req, res) {
    var urlPath = url.parse(req.url).pathname, found = false;
    if (this.urlMap[urlPath]) {
      if (this.methodMap[urlPath].indexOf(req.method) != -1) {
        this.urlMap[urlPath].call(this, req, res);
        found = true;
      }
    } else {
      for (let key in this.urlReg) {
        if (RegExp(key, this.urlRegFlag[key]).test(urlPath)
          && this.methodMap[key].indexOf(req.method) != -1) {
          this.urlMap[key].call(this, req, res);
          found = true;
          break;
        }
      }
    }
    if (!found) this.notFoundHandler(req, res);
    if (req.method != 'POST') this.log(req, res);
  }

  listen(host, port) {
    if (!this.server && /\d{1:3}\.\d{1:3}\.\d{1:3}\.\d{1:3}/.test(host)) {
      this.host = host.toString();
      this.port = parseInt(port) || 8000;
    }
    return;
  }

  run(host, port, handler) {
    this.host = host || this.host;
    this.port = parseInt(port) || this.port;
    if (handler) this.mainHandler = handler;
    this.startServer();
  }

  startServer() {
    if (this.server) return;
    this.server = http.createServer(this.mainHandler.bind(this));
    this.server.listen(this.port || 8000, this.host || '127.0.0.1', () => {
      console.log(`the server start on ${this.host || '127.0.0.1'}:${this.port || 8000}`);
    });
  }
  
  log(req, res) {
    console.log(`${req.url}\n\t\t${req.method}\t${res.statusCode}`);
  }

  renderHtml(myUrl, param) {
    var render = new HtmlRender(myUrl);
    for (let key in param) {
      render.setParam(key, param[key]);
    }
    return render.content;
  }

  staticHandler(req, res) {
    var filePath = url.parse(req.url).pathname, ext = path.parse(filePath).ext.replace(/^\./, ""), store = File.readFileSync(filePath);
    if (store['data']) this.sendFile(res, store['data'], ext, 200);
    else this.notFoundHandler(req, res);
  }

  sendFile(res, data, ext, status) {
    res.writeHead(status, {
      'Content-Type': this.extMap[ext]
    });
    res.write(data);
    res.end();
  }

  notFoundHandler(req, res) {
    res.writeHead(404, {
      "Content-Type": "text/html"
    });
    res.write(this.renderHtml('views/404.html', {
      'url': (req.headers.host || "") + req.url,
      'host': req.headers.host
    }));
    res.end();
  }

}

App.prototype.extMap = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

exports.app = App;
