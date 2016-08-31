(function () {
  'use strict';

  var amqp = require('amqplib/callback_api');
  var connection;

  var init = function(){
    // NOTE get docker ip dinamically??
    amqp.connect('amqp://172.17.0.2', function(err, conn) {
      if(err){
        throw new Error('[RabbitMQ]' + JSON.stringify(err));
      }
      connection = conn;
    });
  }

  module.exports = {
    init: init,
    get: function(){
      return connection;
    }
  }
})(); 