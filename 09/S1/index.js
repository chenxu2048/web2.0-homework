'use strict';
var $;
function Counter() {
  this.A = -1;
  this.B = -1;
  this.C = -1;
  this.D = -1;
  this.E = -1;
  this.valid = true;
  this.count = 0;
}

Counter.prototype.reset = function() {
  this.A = this.B = this.C = this.D = this.E = -1;
  this.valid = true;
  this.count = 0;
};

Counter.prototype.sum = function() {
  return this.A + this.B + this.C + this.D + this.E;
};

$(function() {
  initAscyn($('#button'));
  $('.button').on('click', getData);
  $('#button').on('mouseleave', function() {
    this.counter.reset();
    resetButton();
    enableButton();
    $('#info-bar').removeClass('enable').find('span').html('');
  });
});

function initAscyn($button) {
  $button[0].counter = new Counter();
  $button[0].counter.reset();
  $('.button').each(function() {
    arguments[1].counter = $button[0].counter;
  });
  $('#info-bar').on('click', function() {
    if ($(this).hasClass('enable')) {
      $(this).removeClass('enable');
      $('#total').html($('#button')[0].counter.sum()).removeClass('hide');
      $('.button').addClass('enable');
      $('#button')[0].counter.reset();
    }
  });
  resetButton($button);
  enableButton();
}

function resetButton($button) {
  $button.find('span').addClass('hide');
  $button.find('span').html('');
  $button[0].counter.reset();
  enableButton();
}

function enableButton() {
  $('.button').each(function() {
    var button = arguments[1];
    if (button.counter[button.id] === -1) {
      $(button).addClass('enable');
    }
  });
}

function disableButton() {
  $('.button').each(function() {
    var button = arguments[1];
    if (button.counter[button.id] === -1) {
      $(button).removeClass('enable');
    }
  });
}

function getData() {
  var that = this;
  var counter = this.counter;
  if (counter.valid && counter[this.id] == -1) {
    counter.valid = counter[this.id] = false;
    disableButton();
    var $span = $(this).find('span');
    $span.removeClass('hide').html('...');
    $.get('/' + Number(new Date), function(data, status) {
      if (status === 'success' && !counter.valid) {
        counter[that.id] = parseInt(data);
        counter.valid = true;
        counter.count++;
        $span.html(data);
        enableButton();
        $(that).removeClass('enable');
        if (counter.count >= 5) $('#info-bar').addClass('enable');
      }
    });
  }
}

function resetButton() {
  $('.button').each(function() {
    var $button = $(arguments[1]);
    $button.find('span').html('').addClass('hide');
  });
}