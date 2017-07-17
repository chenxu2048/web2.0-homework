var UserManage;
const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function loginSubmitController(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.write(JSON.stringify({status: 0, err: 'null param'}));
    res.end();
    return;
  }
  var passwd = md5(req.body.password);
  var usernamePromise = UserManage.loginTest(req.body.username, passwd);
  usernamePromise.then(obj => {
    req.session.user = req.body.username;
    res.write(JSON.stringify({status: 1}));
    res.end();
  }).catch(err => {
    res.write(JSON.stringify({status: 0, err}));
    res.end();
  });
}

function usernameValidateController(req, res, next) {
  Validate(req.body.username).then(msg => {
    res.write(JSON.stringify(msg));
    res.end();
  }).catch(err => {
    res.write(JSON.stringify(err));
    res.end();
  });
}

function Validate(username) {
  var validatePromise = new Promise((resolve, reject) => {
    if (username == null) {
      return reject({status: 0, err: '空用户名'});
    } else if (/^[a-zA-Z]{1}[\w_]{5,15}$/.test(username) === false) {
      return reject({status: 0, err: '非法用户名'});
    }
    UserManage.checkExist(username).then(obj => {
      resolve({status: 1});
    }).catch(err => {
      reject({status: 0, err: '用户名不存在'});
    });
  });
  return validatePromise;
}

module.exports = function(db) {
  UserManage = require('../models/userManage')(db);
  return {
    loginSubmitController,
    usernameValidateController
  };
}