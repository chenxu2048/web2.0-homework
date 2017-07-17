'use strict';
var fs = require('fs');
var path = require('path');

class File {
  constructor() {
    if (File.instance) {
      return File.instance;
    } else {
      File.instance = this;
      this.base = '.';
      return this;
    }
  }

  setBase(base) {
    this.base = base;
  }

  readFile(filePath, callback, base) {
    var ret = {};
    fs.readFile(path.join(base || this.base, filePath), (err, data) => {
      if (err) {
        ret['err'] = err;
        ret['status'] = 0;
      } else {
        ret['status'] = 1;
        ret['data'] = data;
      }
    });
    callback(ret);
  }

  readFileSync(filePath, base) {
    var ret = {};
    try {
      ret['data'] = fs.readFileSync(path.join(base || this.base, filePath));
    } catch (err) {
      ret['err'] = err;
      ret['status'] = 0;
    }
    if (ret['status'] !== 0) ret['status'] = 1;
    return ret;
  }

  writeFile(filePath, data, callback, base) {
    fs.writeFileSync(path.join(base || this.base, filePath), data, err => console.log(err));
  }
}

exports.File = new File()