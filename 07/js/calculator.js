'use strict';
function Button(button) {
  this.dom = button;
  button._button = this;
  this.num = isNum(button.innerText) ? parseInt(button.innerText) : null;
  this.opr = /[+\-\/*.()]{1}/.test(button.innerText) ? button.innerText : null;
  this.ce = button.innerText === "CE" ? true : null;
  this.eq = button.innerText === "=" ? true : null;
  this.backspace = button.innerText === "←" ? true : null;
}

Button.prototype.value = function() {
  if (isNum(this.num)) return this.num;
  else if (this.opr) return this.opr;
  else return null;
};

function Calculator(calculator) {
  this.panel = [];
  this.dom = calculator;
  this.prevOpr = this.expr = "";
  this.empty = true;
  calculator._calculator = this;
  $(calculator).find("#calculator-body button").each(function() {
    calculator._calculator.panel.push(new Button(this));
  });
}

Calculator.prototype.add = function(button) {
  if (!(button instanceof Button)) return;
  if (isNum(button.num)) this.appendOpr(), this.expr += button.value();
  else if (button.opr) this.appendOpr(button);
  else if (button.backspace) this.backspace();
  else if (button.ce) this.reset();
  if (button.eq) this.evaluate();
  this.syncExpr();
};

Calculator.prototype.syncExpr = function() {
  if (this.empty) $("#expression").html("0");
  else $("#expression").html(this.expr);
};

Calculator.prototype.backspace = function() {
  this.expr = this.expr.replace(/.$/, "");
  if (!this.expr) this.empty = true;
};

Calculator.prototype.appendOpr = function(button) {
  if (this.empty) this.empty = false;
  if (!button) {
    this.prevOpr = "";
  } else {
    if ("+-*/".indexOf(button.opr) != -1 && this.prevOpr) this.expr = this.expr.replace(/.$/, "");
    else if ("+-*/.".indexOf(button.opr) != -1 && this.empty) this.expr += "0";
    this.prevOpr = button.opr;
    this.expr += button.opr;
  }
};

Calculator.prototype.evaluate = function() {
  this.expr = this.expr.replace(/([+\-*\/]{1}|^)0+([0-9.])+?/g, "$1$2");
  this.expr = this.expr ? this.expr : "0";
  var res = null;
  try {
    res = format(eval(this.expr));
  } catch (e) {
    window.alert(e);
  }
  if (res) $("#prev-expression").text(res);
  this.reset();
};

Calculator.prototype.reset = function() {
  this.empty = true;
  this.expr = "";
};

function calculate() {
  $("#expression").html("0");
  $("prev-expression").html("");
  var calculator = new Calculator($("#calculator")[0]);
  registerCalculator(calculator);
}

function registerCalculator(calculator) {
  $(calculator.dom).click(function(event) {
    if (event.target._button) {
      calculator.add(event.target._button);
    }
  });
}

$(calculate);

function format(value) {
  if (value == "Infinity") return "∞";
  else if (isNaN(value)) throw String("Not A Number");
  else if (value.toString().includes(".")) {
    var len = value.toString().length - value.toString().indexOf(".") - 2;
    len = len > 13 ? len : 13;
    value = parseFloat(value.toFixed(len));
  }
  return value;
}

function isNum(num) {
  if (num === null || num === "" || num === ".") {
    return false;
  } else {
    return !isNaN(num);
  }
}