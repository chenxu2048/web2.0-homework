function init() {
  registerMessage(playGame);
}

function registerMessage(func) {
  var alert_div = document.createElement("div");
  alert_div.id = "maze-info";
  alert_div.className = "hide-message";
  document.getElementById("maze-position").appendChild(alert_div);
  if (func) func();
}

function playGame () {
  var begin = false;
  var failed = false;

  var redElement = null;
  // cheat record
  var cheat = false;
  var start = document.getElementById("start");
  var end = document.getElementById("end");
  var mazeInfo = mazeMessage.bind(null, document.getElementById("maze-info"));

  // register start event
  start.addEventListener('mouseover', function() {
    mazeInfo();
    if (redElement) {
      redElement.classList.remove("red-wall");
      redElement = null;
    }
    if (!begin) {
      begin = true;
      failed = false;
      cheat = false;
    }
  });

  // register end event
  end.addEventListener('mouseover', function() {
    if (begin && !failed && cheat) {
      mazeInfo("Don't Cheat");
    } else if (begin && !failed) {
      mazeInfo("You Win");
    }
    begin = false;
  });


  // register the wall event
  var wall = document.getElementById("maze-position").getElementsByClassName("maze-wall");
  Array.prototype.forEach.call(wall, function(one) {
    one.addEventListener('mouseover', function() {
      if (begin && !failed) {
        begin = false;
        failed = true;
        this.classList.add("red-wall");
        mazeInfo("You Lose");
        redElement = this;
      }
    });
  });
  
  // register cheat event
  var anti_cheat = document.getElementById("right-anti-cheat");
  anti_cheat.addEventListener('mouseover', function() {
    cheat = true;
  });

}

function mazeMessage(element, message) {
  if (message && element) {
    element.className = "show-message";
    element.innerText = message;
  } else if (element) {
    element.className = "hide-message";
  } else {
    console.warn("mazeMessage isn't initial");
  }
}

window.onload = init;