(function () {
  'use strict';

  const amqp = require('amqplib/callback_api');
  const request = require('superagent');
  const P = require('bluebird');
  // const Gif = require('/service/rest-service.js').Gif;


  amqp.connect('amqp://172.17.0.2', function(err, conn) {
    conn.createChannel(function(err, ch) {
      const q = 'rest-service';
      var qt = 'rest-tenant';

      ch.assertQueue(q, {durable: false});
      ch.assertQueue(qt, {durable: false});
      console.log(" [*] Waiting for tenants in %s.", q);
      ch.consume(q, function(msg) {
        const tenant = JSON.parse(msg.content.toString());
        console.log(" [x] Tenant updated %s", tenant.name);

        // load gifs by querystring
        // we can do anything here and notify the service only when needed (eg: polling, monitoring, ...)
        request
          .get('http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=' + tenant.attributes.q)
          .set('Accept', 'application/json')
          .end(function(err, res){
            // TODO
            // - send event to update tenant

            // for each gif send a RabbitMq event
            res.body.data.forEach(gif => {
              const gifModel = {
                name: gif.slug,
                url: gif.images.fixed_height.url,
                tenantId: tenant._id,
                tenantName: tenant.name
              };
              ch.sendToQueue(qt, new Buffer(JSON.stringify(gifModel)))
            });
          });

      }, {noAck: true});
    });
  });
})(); 