let UserManage;
const _ = require('lodash');
const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

let keyMap = ['username', 'password', 'email', 'id', 'phone'];

function registerSubmitController(req, res, next) {
  let user = _.reduce(req.body, (result, value, key) => {
    if (keyMap.indexOf(key) != -1) result[key] = String(value);
    return result;
  }, {});
  validateAll(user).then(value => {
    user.password = md5(user.password);
    UserManage.saveUser(user).then(obj => {
      req.session.user = user.username;
      res.write(JSON.stringify({status: 1}));
      res.end();
    });
  }).catch(err => {
    console.log(err);
    res.write(JSON.stringify({status: 0, err}));
    res.end();
  });
}


const validatorMaps = {
  id: idValidate,
  username: usernameValidate,
  password: passwdValidate,
  email: emailValidate,
  phone: phoneValidate
};
function validatorController(req, res, next) {
  for (let key in req.body) {
    if (validatorMaps[key]) {
      var validatePromise = validatorMaps[key](req.body[key]);
      break;
    }
  }
  if (validatePromise) {
    validatePromise.then(ret => {
      res.write(JSON.stringify(ret));
      res.end();
    }).catch(err => {
      res.write(JSON.stringify(err));
      res.end();
    });
  } else {
    res.write(JSON.stringify({status: 0, err: 'null request'}));
  }
}

function checkRepeat(attr, value) {
  return UserManage.checkRepeat({[attr]: value});
}

function usernameValidate(username) {
  var validatePromise = new Promise((resolve, reject) => {
    if (username == null) {
      return reject({'status': 0, 'err': '用户名不为空'});
    } else if (username.length > 18 || username.length < 6) {
      return reject({'status': 0, 'err': '用户名长度在6~18之间'});
    } else if (/^[a-zA-Z]{1}[\w_]{5,15}/.test(username) === false) {
      return reject({'status': 0, 'err': '用户名以字母开头， 由字母、数字、下划线组成'});
    }
    return checkRepeat('username', username).then(obj => resolve({status: 1}), err => reject({status: 0, err: '用户名重复'}));
  });
  return validatePromise;
}

function idValidate(id) {
  var validatePromise = new Promise((resolve, reject) => {
    if (id == null) {
      return reject({'status': 0, 'err': '学号不为空'});
    } else if (/^[1-9]{1}\d{7}$/.test(id) === false) {
      return reject({'status': 0, 'err': '学号是不以0开头且长度为8的数字'});
    }
    checkRepeat('id', id).then(obj => resolve({status: 1}), err => reject({status: 0, err: '学号重复'}));
  });
  return validatePromise;
}

function emailValidate(email) {
  var validatePromise = new Promise((resolve, reject) => {
    if (email == null) {
      return reject({'status': 0, 'err': '邮箱不为空'});
    } else if (/^([\w_\-]+?\.{0,1})+[\w\-_]+@(([\w_\-])+\.)+[a-zA-Z]{2,4}$/.test(email) === false) {
      return reject({'status': 0, 'err': '邮箱格式不正确'});
    }
    return checkRepeat('email', email).then(obj => resolve({status: 1}), err => reject({status: 0, err: '邮箱重复'}));
  });
  return validatePromise;
}

function phoneValidate(phone) {
  
  var validatePromise = new Promise((resolve, reject) => {
    if (phone == null) {
      return reject({'status': 0, 'err': '电话不为空'});
    } else if (/^[1-9]{1}\d{10}/.test(phone) === false) {
      return reject({'status': 0, 'err': '电话是不以0开头且长度为8的数字'});
    }
    return checkRepeat('phone', phone).then(obj => resolve({status: 1}), err => reject({status: 0, err: '电话重复'}));
  });
  return validatePromise;
}

function passwdValidate(passwd) {
  var validatePromise = new Promise((resolve, reject) => {
    if (passwd == null) {
      return reject({status: 0, err: '密码不为空'});
    } else if (passwd.length > 18 || passwd.length < 6) {
      return reject({status: 0, err: '密码长度在6~18之间'});
    } else if (/^[a-zA-Z0-9_\-]{6, 18}$/.test(passwd)) {
      return reject({status: 0, err: '密码只能包含数字，字母，中划线，下划线'});
    }
    resolve({status: 1});
  });
  return validatePromise;
}


function validateAll(user) {
  return Promise.all([
    usernameValidate(user.username),
    emailValidate(user.email),
    idValidate(user.id),
    phoneValidate(user.phone),
    passwdValidate(user.password)
    ]);
}

module.exports = function(db) {
  UserManage = require('../models/userManage')(db);
  return {
    registerSubmitController,
    validatorController
  };
};