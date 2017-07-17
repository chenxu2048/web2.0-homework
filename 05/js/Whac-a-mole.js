'use strict';
function playGame() {
  var time = document.getElementById("time");
  var pause = false;
  var mole = null;
  var timer = null;
  var begin = false;
  var timeout = null;
  var count = 50;

  var difficulty = "easy";
  var hole_num = {
    "easy" : 54,
    "normal" : 77,
    "hard" : 96
  };

  var message = document.getElementById("message");

  var holes = document.getElementsByClassName("hole-" + difficulty);

  var score = document.getElementById("score");

  var start = document.getElementById("game-start");
  start.addEventListener('click', function() {
    window.console.log("start click");
    if (!begin) {
      addAMole();
      time.value = 30;
      start.innerText = "Stop Game";
      message.innerText = "in the game";
      timer = setInterval(function() {
        if (time.value > 0) {
          time.value--;
        } else {
          window.clearInterval(timer);
          window.clearTimeout(timeout);
          timeout = timer = null;
          mole.classList.remove("mole");
          mole = null;
          begin = false;
          time = 0;
          count = 50;
          start.innerHTML = "Start Game";
          message.innerText = "Game Over";
          window.alert("You got " + score.value.toString());
        }
      }, 1000);
      score.value = 0;
      begin = true;
    } else {
      window.clearInterval(timer);
      window.clearTimeout(timeout);
      timeout = timer = null;
      mole.classList.remove("mole");
      mole = null;
      begin = false;
      pause = false;
      time.value = 0;
      count = 50;
      start.innerHTML = "Start Game";
      message.innerText = "Whac-a-mole";
    }
  });

  var game_body = document.getElementById("game-body");
  setDifficulty();

  var pause_button = document.getElementById("pause");
  pause_button.addEventListener('click', function() {
    if (!pause) {
      pause = true;
      if (begin) {
        window.clearInterval(timer);
        window.clearInterval(timeout);
        message.innerText = "PAUSE";
      }
      if (mole) mole.classList.remove("mole");
    } else {
      pause = false;
      if (begin) {
        message.innerText = "in the game";
        timer = setInterval(function() {
          if (time.value > 0) {
            time.value--;
          } else {
            window.clearInterval(timer);
            window.clearTimeout(timeout);
            timeout = timer = null;
            mole.classList.remove("mole");
            mole = null;
          }
        }, 1000);
        timeout = setInterval(function() {
          if (count <= 0 && mole) {
            window.clearTimeout(timeout);
            window.console.log("time out");
            mole.classList.remove("mole");
            addAMole();
          } else if (count > 0) {
            count--;
          }
        }, 100);
      }
      if (mole) mole.classList.add("mole");
    }
  });

  function registerHole() {
    var holes = document.getElementsByClassName("hole-" + difficulty);
    Array.prototype.forEach.call(holes, function(one) {
      one.addEventListener('click', function(event) {
        if (event) event = window.event;
        if (this === mole && time.value > 0 && !pause) {
          this.classList.remove("mole");
          score.value++;
          window.clearTimeout(timeout);
          addAMole();
        } else if (time.value > 0 && !pause && begin) {
          score.value--;
        }
      });
    });
  }

  var select = document.getElementById("difficulty");
  select.addEventListener('click', function(event) {
    if (!event) event = window.event;
    if (event.target != event.currentTarget && !begin) {
      difficulty = event.target.innerText.toLowerCase();
      setDifficulty(event.target);
      window.console.log("set difficulty");
    }
  });

  function setDifficulty() {
    for (var index = 0; index < game_body.childNodes.length; i++) {
      game_body.removeChild(game_body.childNodes[0]);
    }
    game_body.className = "game-" + difficulty;
    window.console.log(hole_num[difficulty]);
    for (var i = 0; i < hole_num[difficulty]; i++) {
      var new_hole = document.createElement("div");
      new_hole.classList.add("hole-" + difficulty);
      game_body.appendChild(new_hole);
    }
    registerHole();
  }

  function addAMole() {
    if (!holes.length) {
      holes = document.getElementsByClassName("hole-" + difficulty);
      window.console.log("hole-" + difficulty);
    }
    var random = Math.round((Math.random() * holes.length));
    mole = holes[random];
    window.console.log(mole);
    mole.classList.add("mole");
    count = 50;
    timeout = setInterval(function() {
      if (count <= 0 && mole) {
        window.clearTimeout(timeout);
        window.console.log("time out");
        mole.classList.remove("mole");
        addAMole();
      } else if (count > 0) {
        count--;
      }
    }, 100);
  }

}


window.onload = function() {
  playGame();
};


