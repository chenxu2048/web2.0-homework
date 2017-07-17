'use strict';


// callback param: message currentSum
function AHandler(elem, currentSum, next, callback) {
  var that = this, currentPos = next ? next.pos : null;
  if (!callback && !$(elem).hasClass('enable')) return;
  disableButton(elem);
  $(elem).find('span').removeClass('hide').html("...");
  $.get('/', function(data, success) {
    console.log('get in', elem);
    if (!callback) {
      $(elem).find('span').html(data);
      enableButton(elem);
      if (!$('.button').find('span').hasClass('hide')) $('#info-bar').addClass('enable');
      return;
    }
    if (Math.random() < 0.35) success = 'failed';
    if (success === 'success') {
      $(elem).find('span').html(data);
      enableButton(elem);
      $('#message').show().html('这是个天大的秘密');
      next.pos = currentPos + 1;
      console.log(currentSum);
      var errorCount = 0;
      var errorCallback = function(message, currentSum) {
        errorCount++;
        $('#message').show().html(message + (errorCount > 1 ? '  +' + errorCount : ''));
        console.log(currentSum);
        next.HandlerMap[next[currentPos + 1]](
          $('#' + next[currentPos + 1])[0],
          Number(currentSum),
          next,
          errorCallback);
      };
      setTimeout(next.HandlerMap[next[next.pos]].bind(null,
        $('#' + next[next.pos])[0],
        Number(currentSum) + Number(data),
        next,
        errorCallback), 400);
    } else {
      callback("这不是个天大的秘密", currentSum);
    }
  });
}


function BHandler(elem, currentSum, next, callback) {
  var that = this, currentPos = next ? next.pos : null;
  if (!callback && !$(elem).hasClass('enable')) return;
  disableButton(elem);
  $(elem).find('span').removeClass('hide').html("...");
  $.get('/', function(data, success) {
    console.log('get in', elem);
    if (!callback) {
      $(elem).find('span').html(data);
      enableButton(elem);
      if (!$('.button').find('span').hasClass('hide')) $('#info-bar').addClass('enable');
      return;
    }
    if (Math.random() < 0.35) success = 'failed';
    if (success === 'success') {
      $(elem).find('span').html(data);
      enableButton(elem);
      $('#message').show().html('我不知道');
      next.pos = currentPos + 1;
      console.log(currentSum);
      var errorCount = 0;
      var errorCallback = function(message, currentSum) {
        errorCount++;
        $('#message').show().html(message + (errorCount > 1 ? '  +' + errorCount : ''));
        console.log(currentSum);
        next.HandlerMap[next[next.pos]](
          $('#' + next[next.pos])[0],
          Number(currentSum),
          next,
          errorCallback);
      };
      setTimeout(next.HandlerMap[next[next.pos]].bind(null,
        $('#' + next[next.pos])[0],
        Number(currentSum) + Number(data),
        next,
        errorCallback), 400);    
    } else {
      callback("我知道", currentSum);
    }
  });
}


function CHandler(elem, currentSum, next, callback) {
  var that = this, currentPos = next ? next.pos : null;
  if (!callback && !$(elem).hasClass('enable')) return;
  disableButton(elem);
  $(elem).find('span').removeClass('hide').html("...");
  $.get('/', function(data, success) {
    console.log('get in', elem);
    if (!callback) {
      $(elem).find('span').html(data);
      enableButton(elem);
      if (!$('.button').find('span').hasClass('hide')) $('#info-bar').addClass('enable');
      return;
    }
    if (Math.random() < 0.35) success = 'failed';
    if (success === 'success') {
      $(elem).find('span').html(data);
      enableButton(elem);
      $('#message').show().html('你不知道');
      next.pos = currentPos + 1;
      console.log(currentSum);
      var errorCount = 0;
      var errorCallback = function(message, currentSum) {
        errorCount++;
        $('#message').show().html(message + (errorCount > 1 ? '  +' + errorCount : ''));
        console.log(currentSum);
        next.HandlerMap[next[next.pos]](
          $('#' + next[next.pos])[0],
          Number(currentSum),
          next,
          errorCallback);
      };
      setTimeout(next.HandlerMap[next[next.pos]].bind(null,
        $('#' + next[next.pos])[0],
        Number(currentSum) + Number(data),
        next,
        errorCallback), 400);  
    } else {
      callback("你知道", currentSum);
    }
  });
}


function DHandler(elem, currentSum, next, callback) {
  var that = this, currentPos = next ? next.pos : null;
  if (!callback && !$(elem).hasClass('enable')) return;
  disableButton(elem);
  $(elem).find('span').removeClass('hide').html("...");
  $.get('/', function(data, success) {
    console.log('get in', elem);
    if (!callback) {
      $(elem).find('span').html(data);
      enableButton(elem);
      if (!$('.button').find('span').hasClass('hide')) $('#info-bar').addClass('enable');
      return;
    }
    if (Math.random() < 0.35) success = 'failed';
    if (success === 'success') {
      $(elem).find('span').html(data);
      enableButton(elem);
      $('#message').show().html('他不知道');
      next.pos = currentPos + 1;
      console.log(currentSum);
      var errorCount = 0;
      var errorCallback = function(message, currentSum) {
        errorCount++;
        $('#message').show().html(message + (errorCount > 1 ? '  +' + errorCount : ''));
        console.log(currentSum);
        next.HandlerMap[next[next.pos]](
          $('#' + next[next.pos])[0],
          Number(currentSum),
          next,
          errorCallback);
      };
      setTimeout(next.HandlerMap[next[next.pos]].bind(null,
        $('#' + next[next.pos])[0],
        Number(currentSum) + Number(data),
        next,
        errorCallback), 400);    
    } else {
      callback("他知道", currentSum);
    }
  });
}

function EHandler(elem, currentSum, next, callback) {
  var that = this, currentPos = next ? next.pos : null;
  if (!callback && !$(elem).hasClass('enable')) return;
  disableButton(elem);
  $(elem).find('span').removeClass('hide').html("...");
  $.get('/', function(data, success) {
    console.log('get in', elem);
    if (!callback) {
      $(elem).find('span').html(data);
      enableButton(elem);
      if (!$('.button').find('span').hasClass('hide')) $('#info-bar').addClass('enable');
      return;
    }
    if (Math.random() < 0.35) success = 'failed';
    if (success === 'success') {
      $(elem).find('span').html(data);
      enableButton(elem);
      $('#message').show().html('才怪');
      next.pos = currentPos + 1;
      console.log(currentSum);
      var errorCount = 0;
      var errorCallback = function(message, currentSum) {
        errorCount++;
        $('#message').show().html(message + (errorCount > 1 ? '  +' + errorCount : ''));
        console.log(currentSum);
        next.HandlerMap[next[next.pos]](
          $('#' + next[next.pos])[0],
          Number(currentSum),
          next,
          errorCallback);
      };
      setTimeout(next.HandlerMap[next[next.pos]].bind(null,
        $('#' + next[next.pos])[0],
        Number(currentSum) + Number(data),
        next,
        errorCallback), 400);   
    } else {
      callback("才对", currentSum);
    }
  });
}

function BubbleHandler(elem, currentSum, next, callback) {
  if (callback) {
    if (Math.random() >= 0.35) {
      setTimeout(function() {
        $(elem).find('#total').html(currentSum);
        $('#message').show().html('楼主异步调用战斗力感人， 目测不超过' + currentSum);
        $('.apb').data('start', false);
        $('.button').addClass('enable');
      }, 1000);
    } else {
      console.log('BubbleHandler error');
      setTimeout(callback.bind(null, '楼主异步调用战斗力菜鸡， 已经超过' + currentSum, currentSum), 400);
    }
  } else {
    if (!$('.button').find('span').hasClass('hide')) {
      var buttons = $('.button'), sum = 0;
      for (var i = 0; i < buttons.length; ++i) {
        sum += Number($(buttons[i]).find('span').html());
      }
      $(elem).removeClass('ensable').find('#total').html(sum);
      $('.button').addClass('enable');
    }
  }
}




$(function() {
  initAscyn($('#button'));
  $('#button').on('mouseleave', function() {
    resetButton();
    enableButton();
    $('.apb').data('start', false);
    $('#message, #order').hide();
    $('#info-bar').removeClass('enable').find('span').html('');
  });
  $('#button').on('mouseover', function() {
    $('.apb').data('start', false);
  });
});

function initAscyn($button) {
  $('#A').click(AHandler.bind(null, $('#A')[0]));
  $('#B').click(BHandler.bind(null, $('#B')[0]));
  $('#C').click(CHandler.bind(null, $('#C')[0]));
  $('#D').click(DHandler.bind(null, $('#D')[0]));
  $('#E').click(EHandler.bind(null, $('#E')[0]));
  $('#message, #order').hide();
  $('#info-bar').on('click', BubbleHandler.bind(null, $('#info-bar')[0]));
  resetButton($button);
  enableButton();
  $('.apb').on('click', autoClick);
}

function resetButton() {
  $('span').html('');
  $('.button span').addClass('hide');
  enableButton();
}

function enableButton(elem) {
  $('.button').each(function() {
    if (this == elem) $(this).removeClass('enable');
    else if (!$(this).find('span').html()) $(this).addClass('enable');
  });
}

function disableButton(no) {
  $('.button').each(function() {
    if (this != no) {
      $(this).removeClass('enable');
    }
  });
}

function autoClick() {
  if ($(this).data('start')) return;
  $(this).data('start', true);
  resetButton();
  var next = getRandomOrder().split('');
  showOrder(next.join(''));
  next.push('info-bar');
  next.pos = 0;
  next.HandlerMap = {
    'A': AHandler,
    'B': BHandler,
    'C': CHandler,
    'D': DHandler,
    'E': EHandler,
    'info-bar': BubbleHandler
  };
  var errorCount = 0;
  var errorCallback = function(message, currentSum) {
    errorCount++;
    $('#message').show().html(message + (errorCount > 1 ? '  +' + errorCount : ''));
    console.log(currentSum);
    next.HandlerMap[next[next.pos]](
      $('#' + next[0]),
      0,
      next,
      errorCallback);
  };
  next.HandlerMap[next[0]]($('#' + next[0])[0], 0, next, errorCallback);
}


var getRandomOrder = (function() {
  var preOrder = 'ABCDE';
  return function() {
    var sort = function() {
      return 0.5 - Math.random();
    };
    preOrder = preOrder.split('').sort(sort).join('');
    return preOrder;
  };
})();

function showOrder(callChain) {
  $('#order').show().html(callChain.split('').join('->'));
}