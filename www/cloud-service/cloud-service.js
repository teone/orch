(function () {
  'use strict';
  var mongoose = require('../core/config/mongo.js');
  var P = require('../core/node_modules/bluebird');
  var channel;
  var q = 'cloud-service';
  var qt = 'cloud-tenant';

  var init = function(app, emitter, rabbitmq){

    // Create a rabbitMq channel for this service
    rabbitmq.createChannel(function(err, ch) {
      channel = ch;
      ch.assertQueue(q, {durable: false});
      ch.assertQueue(qt, {durable: false});

      // listening for events from the synchronizer
      ch.consume(qt, function(msg) {
        console.log(msg);
      });
    });

    // Listen for changes in the related tenants
    // and propagate them to the synchronizer
    emitter.on('cloud-service.tenant.save', function(tenant){
      channel.sendToQueue(q, new Buffer(JSON.stringify(tenant)));
    });
  };

  module.exports = {
    init: init
  };

})(); 