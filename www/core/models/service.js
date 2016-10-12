(function () {
  'use strict';
  var mongoose = require('mongoose');
  var io = require('../config/socket.js');

  var serviceSchema = mongoose.Schema({
    name: String,
    attributes: mongoose.Schema.Types.Mixed
  });

  serviceSchema.post('save', function(){
    var socket = io.getSocket();
    socket.emit('service.save', this);
  });

  var Service = mongoose.model('Service', serviceSchema);

  module.exports = Service;

})(); 