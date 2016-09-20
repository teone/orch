(function () {
  'use strict';

  var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://172.17.0.2', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'basic-service';

      ch.assertQueue(q, {durable: false});
      console.log(" [*] Waiting for messages in %s.", q);
      ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
      }, {noAck: true});
    });
  });
})(); 