$(function() {
  var count = $("#second").text();
  var timer = setInterval(function() {
    if (count) {
      count--;
      $("#second").text(count);
    } else {
      window.location.href = "/";
      clearInterval(timer);
    }
  }, 1000);
});