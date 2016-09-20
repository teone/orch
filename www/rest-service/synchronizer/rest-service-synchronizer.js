(function () {
  'use strict';

  var amqp = require('amqplib/callback_api');

  amqp.connect('amqp://172.17.0.2', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'rest-service';

      ch.assertQueue(q, {durable: false});
      console.log(" [*] Waiting for tenants in %s.", q);
      ch.consume(q, function(msg) {
        var tenant = JSON.parse(msg.content.toString());
        console.log(" [x] Tenant updated %s", tenant.name);
        console.log(tenant);
      }, {noAck: true});
    });
  });
})(); 