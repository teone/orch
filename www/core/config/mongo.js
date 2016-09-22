(function () {
  'use strict';

  // NOTE move in separate config
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/xos');

  module.exports = mongoose;
})(); 