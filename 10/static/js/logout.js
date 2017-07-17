function logout() {
  var clickValid = true;
  $('#return').on('click', function() {
    if (!clickValid) return;
    clickValid = false;
    $.post('/api/logout', {}).done(function(ret) {
      try {
        ret = JSON.parse(ret);
      } catch (err) {
        ret = {};
      }
      if (ret.status) {
        window.location.href = '/login';
      } else {
        clickValid = true;
      }
    });
  });
}

$(logout);