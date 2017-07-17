'use strict';

function loginSubmit() {
  var submitValid = true;
  $('#loginButton').on('click', function() {
    if (!submitValid) return;
    submitValid = false;
    var data = $('#signin').serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    if (!data.username) {
      alert('用户名不为空');
      submitValid = true;
      return;
    }
    if ($('#username-wrong').hasClass('show')) {
      alert('请按照提示填写');
      submitValid = true;
      return;
    }
    $.post('/api/login', data).done(function (msg) {
      var ret;
      try {
        ret = JSON.parse(msg);
      } catch (err) {
        ret = {};
      }
      if (ret.status) {
        window.location.href = '/information';
      } else {
        alert('密码错误');
        submitValid = true;
      }
    });
  });
}

function registerSubmit() {
  $('#registerButton').click(function() {
    window.location.href = '/regist';
  });
}

function usernameValidate() {
  $('#username').on('change', function() {
    if (/^[a-zA-Z]{1}[\w_]{5,15}/.test(this.value) === false) {
      $('#username-wrong').addClass('show').text('非法用户名');
    } else {
      $.post('/api/username', {username: this.value}).done(function(ret) {
        var msg;
        try {
          msg = JSON.parse(ret);
        } catch (err) {
          msg = {};
        }

        if (msg.status) {
          $('#username-wrong').removeClass('show');
        } else {
          $('#username-wrong').addClass('show').text('用户名不存在');
        }
      });
    }

  });
}

$(function() {
  loginSubmit();
  registerSubmit();
  usernameValidate();
});