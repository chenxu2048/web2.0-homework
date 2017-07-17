'use strict';

function registerReset() {
  $("#resetForm").on('click', function() {
    $("#signin-register").get(0).reset()
  });
}

function validate(validateMap) {
  $(".form-row input").on('change', function() {
    var query = {};
    query[this.name] = this.value;
    var message = validateMap[this.name] && validateMap[this.name](this.value);
    if (message) {
      toggleMessage(message, this);
    } else {
      checkRepeat(this, query);
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
    toggleMessage(res.message, elem);
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
  $("#submitForm").on('click', function() {
    var pass = true;
    $("#signin-register div").children("input").each(function() {
      if (this.value == "") {
        alert("表单尚未填完");
        return pass = false;
      }
    });
    if ($("#signin-register div").children("div").hasClass("show")) {
      alert("表单格式不正确，请按正确格式填写");
      pass = false;
    }
    if (!pass) return;
    else $("#signin-register").get(0).submit();
  });
}

$(function() {
  var validateMap = {
    'username': usernameValidate,
    'id': idValidate,
    'phone': phoneValidate,
    'email': emailValidate
  };
  registerReset();
  validate(validateMap);
  submit();
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
  } else if (checkRepeat('id', id)) {
    return '学号重复'
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
  } else if (/^[1-9]{1}\d{10}/.test(phone) === false) {
    return '电话号码是不以0开头且长度为11的数字';
  } else {
    return undefined;
  }
}
