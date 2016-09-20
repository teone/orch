(function () {
  'use strict';

  var EventEmitter = require('events').EventEmitter;

  var emitter = new EventEmitter();
  module.exports = emitter;
  // emitter.on('event', () => {
  //   console.log('an event occurred!');
  // });
  // emitter.emit('event');
})(); 