'use strict';
function Counter() {
  this.A = -1;
  this.B = -1;
  this.C = -1;
  this.D = -1;
  this.E = -1;
  this.time = 0;
  this.valid = true;
  this.count = 0;
  this.auto = false;
}

Counter.prototype.reset = function(auto) {
  this.A = this.B = this.C = this.D = this.E = -1;
  this.valid = true;
  this.count = 0;
  this.time++;
  this.auto = auto || false;
};

Counter.prototype.sum = function() {
  return this.A + this.B + this.C + this.D + this.E;
};


$(function() {
  initAscyn($('#button'));
  $('.button').on('click', function() {
    if (!this.counter.auto) getData(this);
  });
  $('#button').on('mouseleave', function() {
    this.counter.reset();
    resetButton();
    enableButton();
    $('.apb').data('start', false);
    $('#info-bar').removeClass('enable').find('span').html('');
  });
  $('#button').on('mouseover', function() {
    $('.apb').data('start', true);
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
  $('.apb').on('click', autoClick);
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

function getData(event, callback) {
  var that = event.target || $(event)[0];
  var counter = that.counter;
  var time = counter.time;
  if (counter.valid && counter[that.id] == -1) {
    counter.valid = counter[that.id] = false;
    disableButton();
    var $span = $(that).find('span');
    $span.removeClass('hide').html('...');
    $.get('/' + Number(new Date), function(data, status) {
      if (status === 'success' && !counter.valid && time == counter.time) {
        counter[that.id] = parseInt(data);
        counter.valid = true;
        counter.count++;
        $span.html(data);
        enableButton();
        $(that).removeClass('enable');
        if (counter.count >= 5) $('#info-bar').addClass('enable');
      }
      if (counter.auto && callback) setTimeout(callback.bind(null, that.id), 500);
    });
  }
}

function resetButton() {
  $('#order').hide();
  $('.button').each(function() {
    var $button = $(arguments[1]);
    $button.find('span').html('').addClass('hide');
  });
}

function autoClick() {
  if (!$('.apb').data('start')) return;
  var counter = $('#button')[0].counter;
  if (!counter.auto && counter.valid) {
    counter.reset(true);
    resetButton();
    enableButton();
    var call = (function(callChain) {
      return function(key) {
        if (callChain[callChain.indexOf(key) + 1]) {
          getData($('#' + callChain[callChain.indexOf(key) + 1]), call);
        } else if ($('#info-bar').hasClass('enable')) {
          $('#info-bar').click();
        }
      };
    })('ABCDE');
    getData($('#A'), call);
  }
}
