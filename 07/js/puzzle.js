'use strict';
function Puzzle(puzzle, timer) {
  puzzle._puzzle = this;
  this.dom = puzzle;
  this.piece_none = null;
  this.timer = timer;
  this.storage = [];
}

function showMassage(msg) {
  $("#message").text(msg);
  if (msg) $("#message").show(1000).delay(4000).hide(10);
}

Puzzle.prototype.swapPiece = function(i, j) {
  var temp = this.storage[i];
  this.storage[i] = this.storage[j];
  this.storage[j] = temp;
  this.storage[i].index = j;
  this.storage[j].index = i;
  this.storage[i].swap(this.storage[j]);
};

Puzzle.prototype.addPiece = function(size) {
  var self = this;
  _.times(size, function(i) {
    var piece = new Piece($("<div id='piece-" + (i != size - 1 ? i.toString() : "none") + "'>")[0], i, size);
    piece.dom.classList.add("piece" + (i != size - 1 ? "" : "none"), "col" + piece.col.toString(), "row" + piece.row.toString());
    if (size - 1 == i) self.piece_none = piece;
    self.dom.appendChild(piece.dom);
    self.storage.push(piece);
  });
};

Puzzle.prototype.reset = function() {
  var self = this, temp = [];
  this.storage.forEach(function(one) {
    temp[one.id] = one;
  });
  temp.forEach(function(one) {
    self.swapPiece(one.id, one.index);
  });
  this.timer.minute = this.timer.second = 0;
  this.timer.end();
  this.begin = this.piece_null = null;
};

Puzzle.prototype.canMove = function(index) {
  if (this.nowShuffle) return true;
  return this.timer.isStart() && ((this.storage[index].col == this.piece_none.col && Math.abs(this.storage[index].row - this.piece_none.row) == 1) || 
    (this.storage[index].row == this.piece_none.row && Math.abs(this.storage[index].col - this.piece_none.col) == 1));
};

Puzzle.prototype.move = function(index) {
  if (!this.nowShuffle) addStep();
  this.swapPiece(index, this.piece_none.index);
  if (!this.nowShuffle && this.isWin()) this.timer.end("You Win");
};

Puzzle.prototype.isWin = function() {
  var self = this, ret = true;
  _.times(self.storage.length, function(i) {
    if (self.storage[i].id != i) ret = false;
  });
  return ret;
};

Puzzle.prototype.shuffle = function(num) {
  this.nowShuffle = true;
  var self = this;
  _.times(num, function() {
    self.storage[Math.floor(Math.random() * 16)].dom.click();
  });
  this.nowShuffle = null;
  resetStep();
};

function Piece(piece, index) {
  this.index = this.id = index;
  this.row = Math.floor(index / 4);
  this.col = index - Math.floor(index / 4) * 4;
  this.dom = piece;
  piece._piece = this;
}

Piece.prototype.reset = function() {
  this.index = this.id;
};

Piece.prototype.swap = function(other) {
  if (other instanceof Piece) {
    $(this.dom).removeClass("row" + this.row).removeClass("col" + this.col);
    $(other.dom).removeClass("row" + other.row).removeClass("col" + other.col);
    this.swapPosAttr(other);
    $(this.dom).addClass("row" + this.row).addClass("col" + this.col);
    $(other.dom).addClass("row" + other.row).addClass("col" + other.col);
  }
};

Piece.prototype.swapPosAttr = function(other) {
  var temp = other.index;
  other.index = this.index;
  this.index = temp;
  temp = other.row;
  other.row = this.row;
  this.row = temp;
  temp = other.col;
  other.col = this.col;
  this.col = temp;
};

function playGame() {
  var timer = new Timer($("#timer")), puzzle = new Puzzle($("#puzzle-body")[0], timer);
  puzzle.addPiece(16);
  registerGame(puzzle);
}


function registerGame(puzzle) {
  $("#puzzle-container").click(function(event) {
    if (event.target.id == "start" && !puzzle.timer.isStart()) {
      puzzle.shuffle(1000);
      puzzle.timer.start();
    } else if (event.target._piece && puzzle.canMove(event.target._piece.index)) {
      puzzle.move(event.target._piece.index);
    } else if (event.target.id == "restart") {
      puzzle.reset();
    }
  });
}

function Timer($time) {
  this.$minute = $time.find("#minute");
  this.$second = $time.find("#second");
  this.minute = this.second = this.clock = 0;
  this.dom = $time[0];
  this.dom._timer = this;
  this.set();
}

Timer.prototype.addTime = function() {
  if (this.second < 59) this.second++;
  else if (this.minute < 59) this.minute++;
  else return false;
  this.set();
  return true;
};

Timer.prototype.set = function() {
  this.$minute.text(this.format(this.minute));
  this.$second.text(this.format(this.second));
};

Timer.prototype.reset = function() {
  this.minute = this.second = 0;
  this.set();
};

Timer.prototype.start = function() {
  if (this.isStart()) return;
  var self = this;
  this.reset();
  this.clock = setInterval(function() {
    if (!self.addTime()) self.end("Time out");
  }, 1000);
};

Timer.prototype.end = function(msg) {
  if (this.isStart()) {
    clearInterval(this.clock);
    if (msg) showMassage(msg);
    this.clock = 0;
  }
};

Timer.prototype.isStart = function() {
  return this.clock;
};

Timer.prototype.format = function(num) {
  return new Array(2 - num.toString().length + 1).join("0") + num;
};

function resetStep() {
  $("#step-number").text("0");
}

function addStep() {
  $("#step-number").text(parseInt($("#step-number").text()) + 1);
}

$(playGame);