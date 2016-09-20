(function () {
  'use strict';

  var amqp = require('amqplib/callback_api');
  var connection;

  var init = function(){
    // NOTE get docker ip dinamically??
    // now is manually (from container to host) /sbin/ip route|awk '/default/ { print $3 }'
    // from host to container: docker inspect $CID | grep IPAddress | grep -v null| cut -d '"' -f 4 | head -1
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