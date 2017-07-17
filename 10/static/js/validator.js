'use strict';

function registerReset() {
  $("#resetForm").on('click', function() {
    $("#signin-register").get(0).reset();
    $('.message').removeClass('show');
  });
}

function validate(validateMap) {
  $(".form-row input").on('change', function() {
    var query = {};
    query[this.name] = this.value;
    var message = validateMap[this.name] && validateMap[this.name](this.value);
    if (message) {
      toggleMessage(message, this);
    } else if (this.name != 'password_repeat'){
      checkRepeat(this, query);
    } else {
      toggleMessage(undefined, this);
    }
  });
}

function checkRepeat(elem, query) {
  $.post('/api/validate', query).done(function(res) {
    try {
      res = JSON.parse(res);
    } catch (err) {
      res = {};
    }
    toggleMessage(res.err, elem);
  });
}

function toggleMessage(message, elem) {
  if (!message) {
    $(elem).parent().children("div").removeClass("show");
  } else {
    $(elem).parent().children("div").html(message);
    $(elem).parent().children("div").addClass("show");
  }
}

function submit() {
  var submitValid = true;
  $("#submitForm").on('click', function() {
    if (!submitValid) return;
    var pass = true;
    submitValid = false;
    $("#signin-register div").children("input").each(function() {
      if (this.value == "") {
        alert("表单尚未填完");
        return pass = false;
      }
    });
    if (pass && $("#signin-register div").children("div").hasClass("show")) {
      alert("表单格式不正确，请按正确格式填写");
      pass = false;
    }
    if (!pass) {
      submitValid = true;
    } else {
      var data = $('#register').serializeArray().reduce(function(obj, item) {
        if (item.name != 'password_repeat') obj[item.name] = item.value;
        return obj;
      }, {});
      $.post('/api/register', data).done(function(ret) {
        try {
          ret = JSON.parse(ret);
        } catch (err) {
          ret = {};
        }
        if (ret.status) {
          window.location.href = '/information';
        } else {
          submitValid = true;
        }
      });
    }
    submitValid = true;
  });
}

$(function() {
  var validateMap = {
    'username': usernameValidate,
    'id': idValidate,
    'phone': phoneValidate,
    'email': emailValidate,
    'password': passwordValidate,
    'password_repeat': passwordRepeat
  };
  registerReset();
  validate(validateMap);
  submit();
  $('#password').on('change', function() {
    if ($('#password_repeat')[0].value) $('#password_repeat').change();
  });
  $('#return').on('click', function() {
    window.location.href = '/login';
  });
});

function usernameValidate(username) {
  if (username == null) {
    return '用户名不为空'
  } else if (username.length > 18 || username.length < 6) {
    return '用户名长度在6~18之间'
  } else if (/^[a-zA-Z]{1}[\w_]{5,15}/.test(username) === false) {
    return '用户名以字母开头， 由字母、数字、下划线组成';
  } else {
    return undefined;
  }
}

function idValidate(id) {
  if (id == null) {
    return '学号不为空'
  } else if (/^[1-9]{1}\d{7}$/.test(id) === false) {
    return '学号是不以0开头且长度为8的数字'
  } else {
    return undefined;
  }
}

function emailValidate(email) {
  if (email == null) {
    return '邮箱不为空';
  } else if (/^([\w_\-]+?\.{0,1})+[\w\-_]+@(([\w_\-])+\.)+[a-zA-Z]{2,4}$/.test(email) === false) {
    return '邮箱格式不正确';
  } else {
    return undefined;
  }
}

function phoneValidate(phone) {
  if (phone == null) {
    return '电话不为空';
  } else if (/^[1-9]{1}\d{10}$/.test(phone) === false) {
    return '电话号码是不以0开头且长度为11的数字';
  } else {
    return undefined;
  }
}

function passwordValidate(password) {
  if (password == null) {
    return '密码不为空';
  } else if (/^[a-zA-Z0-9_\-]{6,18}$/.test(password) == false) {
    return '密码由数字、字母、_和-组成，长度在6~18之间';
  } else {
    return undefined;
  }
}

function passwordRepeat(repeat) {
  if ($('#password')[0].value != repeat) return '两次密码不一致';
}