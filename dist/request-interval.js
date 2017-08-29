"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requestInterval = function requestInterval(fn, delay) {
  if (!window.requestAnimationFrame) {
    return window.setInterval(fn, delay);
  }

  var time = {
    then: new Date().getTime(),
    now: null,
    delta: null
  };
  var handler = {};
  var loop = function loop() {
    time.now = new Date().getTime();
    time.delta = time.now - time.then;

    if (time.delta >= delay) {
      fn.call();
      time.then = new Date().getTime();
    }

    handler.value = window.requestAnimationFrame(loop);
  };

  handler.value = window.requestAnimationFrame(loop);

  return handler;
};
var clearRequestInterval = function clearRequestInterval(handler) {
  return window.cancelAnimationFrame(handler.value) || window.clearInterval(handler.value);
};

exports.clearRequestInterval = clearRequestInterval;
exports.requestInterval = requestInterval;
