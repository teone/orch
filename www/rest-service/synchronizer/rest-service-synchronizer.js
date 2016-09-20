(function () {
  'use strict';

  var amqp = require('amqplib/callback_api');
  var request = require('superagent');
  var P = require('bluebird');

  amqp.connect('amqp://172.17.0.2', function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'rest-service';

      ch.assertQueue(q, {durable: false});
      console.log(" [*] Waiting for tenants in %s.", q);
      ch.consume(q, function(msg) {
        var tenant = JSON.parse(msg.content.toString());
        console.log(" [x] Tenant updated %s", tenant.name);
        console.log(tenant);

        request
          .get('http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + tenant.attributes.q)
          .set('Accept', 'application/json')
          .end(function(err, res){
            // TODO
            // - save result
            // - send event to update tenant
            console.log(res);
          });

      }, {noAck: true});
    });
  });

  var saveAllGifs = P.promisify(function(gifs, done){

  });

})(); 