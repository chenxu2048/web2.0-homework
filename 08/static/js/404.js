$(function() {
  var count = $("#second").text();
  var timer = setInterval(function() {
    if (count) {
      count--;
      $("#second").text(count);
    } else {
      window.location.href = "/index.html";
      clearInterval(timer);
    }
  }, 1000);
});