function result(value) {
  if (value == "Infinity") return "∞";
  else if (isNaN(value)) throw String("Not A Number");
  else if (value.toString().includes(".")) {
    var len = value.toString().length - value.toString().indexOf(".") - 2;
    len = len > 13 ? len : 13;
    value = parseFloat(value.toFixed(len));
  }
  return value;
}

function calculator() {
  var key_map = {};        // The map between keyboard and button object
  var store = String("");  // The string stores the template expression
  var more = String("");   // storing the positions of extra chars in the store
  var ans = 0;
  function addExpr(value) {
    var expr = document.getElementById("expression");
    if (value == "←") {
      store = store.replace(/.$/, "");
      expr.innerText = expr.innerText.replace(/.$/, "");
      while (more[store.length - 1]) {
        more[store.length - 1] = undefined;
        store = store.replace(/.$/, "");
      }
      if (!expr.innerText) expr.innerText = "0";
    } else if (value == "=") {
      try {
        store = store.replace(/([+\-*\/]{1}|^)0+([0-9.])+?/g, "$1$2");
        if (!store) store = "0";
        console.log(store)
        ans = result(eval(store));
        document.getElementById("prev-expression").innerText = ans;
      } catch (err) {
        console.log(err);
        alert("The expression has some errors:\n" + err);
        document.getElementById("prev-expression").innerText = "ERROR";
      }
      expr.innerText = "0";
      store = "";
      more = [];
    } else if (value == "CE") {
      store = "";
      expr.innerText = "0";
      more = [];
    } else if (expr.innerText.length >= 16) {
      return;
    } else if (/^[0-9.()]$/.test(value)) {
      if (value != "." && expr.innerText == "0" && store == "") expr.innerText = value;
      else expr.innerText += value;
      if (value == "." && /^[+\-*\/]$/.test(store[store.length - 1])) {
        more[store.length] = "1";
        store += "0.";
      } else {
        store += value;
      }
    } else if (/^[+\-*\/]$/.test(value)) {
      if (/^[+\-*\/]$/.test(store[store.length - 1])) {
        store = store.replace(/.$/, value);
        expr.innerText = expr.innerText.replace(/.$/, value);
      } else {
        if (store == "") {
          more = [1, 1, 1];
          store += "ans" + value;
          expr.innerText = "Ans";
        } else {
          store += value;
        }
        expr.innerText += value;
      }
    } else {
      console.error("Unexcepted ERROR");
    }
  }
  var button = document.getElementsByTagName("BUTTON");
  for (var i = 0; i < button.length; i++) {
    if (button[i].innerText == "=") {
      key_map["Enter"] = button[i];
      key_map["="] = button[i];
    } else if (button[i].innerText == "CE") {
      key_map["Delete"] = button[i];
    } else if (button[i].innerText == "←") {
      key_map["Backspace"] = button[i];
    } else {
      key_map[button[i].innerText] = button[i];
    }
    button[i].onclick = function() {
      addExpr(this.innerText);
    }
  }

/* 
  add the key event
*/
  document.addEventListener('keydown', function(event) {
    if (event.key == 'Backspace') event.stopPropagation();
  })
  document.body.addEventListener('keydown', function (event) {
    if (key_map[event.key])
      key_map[event.key].click();
      event.stopImmediatePropagation();
  }, false);
}

window.onload = calculator;
