'use strict';
var $, _;
function SortTable($table) {
  $table[0]._table = this;
  this.dom = $table[0];
  this.row = [];
  this.head = $table.find("th").get();
  $table.find("tr:gt(0)").each(function(i) {
    $(this).data("y-index", i);
    $table[0]._table.row.push(this);
  });
}

SortTable.prototype.initHead = function() {
  $(this.head).each(function (index) {
    $(this).data("x-index", index + 1);
  });
  $(this.head).append("<div class='sort-tag sort-none'>");
};

SortTable.prototype.setHead = function(index) {
  $(this.head).removeClass("select");
  $(this.head[index]).addClass("select");
  $(this.head).children(-1).addClass("sort-none").removeClass("sort-desc sort-asc");
  $(this.head[index]).children(-1).removeClass("sort-none").addClass("sort-" + ($(this.head[index]).data("asc") ? "asc" : "desc"));
};

SortTable.prototype.displayChange = function(sortMap) {
  var self = this, len = this.row.length;
  var temp = sortMap.map(function(elem) {
    return self.row[elem.index];
  });
  _.times(len, function(i) {
    $(self.dom).find("tbody").first().append(temp[i]);
  });
};

function textCompare(asc, left, right) {
  if (!asc) return -textCompare(!asc, left, right);
  else return left.value.localeCompare(right.value);
}

function numberCompare(asc, left, right) {
  if (!asc) return -numberCompare(!asc, left, right);
  return left.value - right.value;
}

SortTable.prototype.getSortMap = function(index) {
  return this.row.map(function(elem) {
    return {
      index: $(elem).data("y-index"),
      value: $(elem).find("td")[index].innerText
    };
  });
};

function isNum(num) {
  if (num !== "" || num !== null) return !isNaN(num);
  return false;
}

function canSortByNumber(map) {
  var ret = true;
  _.forEach(map, function(value) {
    if (!isNum($.trim(value.value))) ret = false;
  });
  return ret;
}

SortTable.prototype.sort = function(index) {
  var sortMap = this.getSortMap(index);
  if (canSortByNumber(sortMap)) sortMap.sort(numberCompare.bind(null, $(this.head[index]).data("asc")));
  else sortMap.sort(textCompare.bind(null, $(this.head[index]).data("asc")));
  $(this.head[index]).data("asc", !$(this.head[index]).data("asc"));
  this.displayChange(sortMap);
  this.setHead(index);
};
SortTable.prototype.canSort = function(dom) {
  return $(dom).data("x-index");
};

function addSortTable() {
  $("table").each(function() {
    var table = new SortTable($(this));
    table.initHead();
  });
  registerTableListener();
}

function registerTableListener() {
  $("table").click(function(event) {
    if (this._table.canSort(event.target)) {
      this._table.sort($(event.target).data("x-index") - 1);
    }
  });
}

$(addSortTable);