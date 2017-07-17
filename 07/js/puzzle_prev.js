(function() {
  'use strict';
  var begin = false;
  var puzzle_map = [];
  var puzzle_body = document.getElementById("puzzle-body");
  var timer = 0;
  var second = 0;
  var minute = 0;
  var message = (function() {
    var mess = document.getElementById("message");
    return function(show) {
      if (!!show) {
        mess.className = "show-message";
        mess.textContent = show;
      } else {
        mess.className = "hide-message";
      }
    }
  })();
  var clock = {
    minute : document.getElementById("minute"),
    second : document.getElementById("second")
  };
  var step = 0;
  var step_number = document.getElementById("step-number");
  function puzzle() {
    initGame();
    var start =document.getElementById("start");
    start.addEventListener("click", function() {
      if (!begin) {
        begin = !begin;
        startGame();
      }
    });
  }
  
  function addZero(str,length){               
      return new Array(length - str.toString().length + 1).join("0") + str;              
  }

  function initGame() {
    message();
    var piece;
    var frag = document.createDocumentFragment();
    for (var index = 0; index < 15; ++index) {
      piece = document.createElement("div");
      var pos = getPos(index);
      piece.classList.add("row" + pos.row);
      piece.classList.add("col" + pos.col);
      piece.classList.add("piece");
      piece.id = pos.row + "-" + pos.col;
      if (pos.row === 0) puzzle_map[pos.col] = [];
      puzzle_map[pos.row][pos.col] = piece;
      frag.appendChild(piece);
    }
    piece = document.createElement("div");
    piece.classList.add("piece-none");
    piece.id = "3-3";
    puzzle_map[3][3] = piece;
    frag.appendChild(piece);
    puzzle_body.appendChild(frag);
    registerPiece();
  }


  // move 1000 step
  function startGame() {
    message();
    step = second = minute = 0;
    step_number.textContent = step;
    clock.minute.textContent = addZero(minute, 2);
    clock.second.textContent = addZero(second, 2);
    randomMove(1000);
    timer = setInterval(function() {
      if (second < 59) {
        second++;
      } else if (minute < 59) {
        second = 0;
        minute++;
      } else {
        message("Time out!");
        begin = false;
        window.clearInterval(timer);
      }
      clock.minute.textContent = addZero(minute, 2);
      clock.second.textContent = addZero(second, 2);
    }, 1000);
  }

  function swapClass(piece1, piece2) {
    var temp = String(piece1.className);
    piece1.className = piece2.className;
    piece2.className = temp;
  }

  function move(map, row, col) {
    if (row > 0 && map[row - 1][col].className == "piece-none") {
      swapClass(map[row][col], map[row - 1][col]);
    } else if (row < 3 && map[row + 1][col].className == "piece-none") {
      swapClass(map[row][col], map[row + 1][col]);
    } else if (col < 3 && map[row][col + 1].className == "piece-none") {
      swapClass(map[row][col], map[row][col + 1]);
    } else if (col > 0 && map[row][col - 1].className == "piece-none") {
      swapClass(map[row][col], map[row][col - 1]);
    } else {
      return false;
    }
    return true;
  }


  function getPos(pos) {
    return {
      row : Math.floor(pos / 4),
      col : pos - Math.floor(pos / 4) * 4
    };
  }

  function isWin() {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if ((i != 3 || j != 3) && (puzzle_map[i][j].className.search("col" + j) == -1 || puzzle_map[i][j].className.search("row" + i) == -1)) {
          return false;
        }
      }
    }
    return true;
  }

  function registerPiece() {
    Array.prototype.forEach.call(puzzle_body.childNodes, function(one) {
      one.addEventListener("click", function() {
        if (begin) {
          if (move(puzzle_map, Number(one.id.split("-")[0]), Number(one.id.split("-")[1]))) {
            step++;
            step_number.textContent = step;
          }
          if (isWin()) {
            window.clearInterval(timer);
            begin = false;
            message("You Win");
          }
        }
      });
    });
  }

  function randint(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
  }

  function randomMove(num) {
    var temp_map = Array(Array(4), Array(4), Array(4), Array(4));
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        temp_map[i][j] = {
          className: String(puzzle_map[i][j].className)
        };
      }
    }
    Array.prototype.forEach.call(puzzle_body.childNodes, function(one) {
      one.classList.add("init-piece");
    });
    var none = [3, 3];
    for (i = 0; i < num; i++) {
      switch (randint(0, 4)) {
        case 0:
          none[0] = none[0] + 1 > 3 ? none[0] : none[0] + 1;
          break;
        case 1:
          none[0] = none[0] - 1 < 0 ? none[0] : none[0] - 1;
          break;
        case 2:
          none[1] = none[1] + 1 > 3 ? none[1] : none[1] + 1;
          break;
        case 3:
          none[1] = none[1] - 1 < 0 ? none[1] : none[1] - 1;
          break;
        default:
          break;
      }
      move(temp_map, none[0], none[1]);
    }
    Array.prototype.forEach.call(puzzle_body.childNodes, function(one) {
      one.className = String(temp_map[Number(one.id.split("-")[0])][Number(one.id.split("-")[1])].className);
    });
  }

  window.onload = puzzle;

})();