var checkRepeat = require('./user').checkRepeat;
var querystring = require('querystring');

function usernameValidate(username) {
  if (username == null) {
    return {'status': 0, 'err': '用户名不为空'};
  } else if (username.length > 18 || username.length < 6) {
    return {'status': 0, 'err': '用户名长度在6~18之间'};
  } else if (/^[a-zA-Z]{1}[\w_]{5,15}/.test(username) === false) {
    return {'status': 0, 'err': '用户名以字母开头， 由字母、数字、下划线组成'}
  } else if (checkRepeat('username', username)) {
    return {'status': 0, 'err': '用户名重复'};
  } else {
    return {'status': 1};
  }
}

function idValidate(id) {
  if (id == null) {
    return {'status': 0, 'err': '学号不为空'};
  } else if (/^[1-9]{1}\d{7}$/.test(id) === false) {
    return {'status': 0, 'err': '学号是不以0开头且长度为8的数字'};
  } else if (checkRepeat('id', id)) {
    return {'status': 0, 'err': '学号重复'};
  } else {
    return {'status': 1};
  }
}

function emailValidate(email) {
  if (email == null) {
    return {'status': 0, 'err': '邮箱不为空'};
  } else if (/^([\w_\-]+?\.{0,1})+[\w\-_]+@(([\w_\-])+\.)+[a-zA-Z]{2,4}$/.test(email) === false) {
    return {'status': 0, 'err': '邮箱格式不正确'};
  } else if (checkRepeat('email', email)) {
    return {'status': 0, 'err': '邮箱重复'};
  } else {
    return {'status': 1};
  }
}

function phoneValidate(phone) {
  if (phone == null) {
    return {'status': 0, 'err': '电话不为空'};
  } else if (/^[1-9]{1}\d{10}/.test(phone) === false) {
    return {'status': 0, 'err': '电话号码是不以0开头且长度为11的数字'};
  } else if (checkRepeat('phone', phone)) {
    return {'status': 0, 'err': '电话重复'};
  } else {
    return {'status': 1};
  }
}


function getQuery(query) {
  return querystring.parse(query);
}

function validate(query) {
  return usernameValidate(query.username)['status']
         && idValidate(query.id)['status']
         && emailValidate(query.email)['status']
         && phoneValidate(query.phone)['status'];
}

exports.usernameValidate = usernameValidate;
exports.idValidate = idValidate;
exports.emailValidate = emailValidate;
exports.phoneValidate = phoneValidate;
exports.getQuery = getQuery;
exports.validate = validate;