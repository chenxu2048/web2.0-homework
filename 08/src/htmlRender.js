'use strict';

var file = require('./File').File;
var path = require('path');

class HtmlRender {
  constructor(htmlPath) {
    this.readHtml(htmlPath);
    this.error = {};
    return this;
  }

  readHtml(htmlPath) {
    if (path.parse(htmlPath).ext === ".html") {
      console.log(htmlPath);
      this.content = file.readFileSync(htmlPath)['data'].toString() || "";
    }
  }

  setParam(param, data) {
    var query = `\${${param}}`;
    if (this.content && this.content.search(`\\${query}`) != -1) {
      this.content = this.content.replace(query, data.toString());
    } else {
      this.error[param] = data;
    }
  }
}

exports.htmlRender = HtmlRender;