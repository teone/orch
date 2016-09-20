(function () {
  'use strict';
  var channel;
  var q = 'rest-service';

  var init = function(app, emitter, rabbitmq){

    // Create a rabbitMq channel for this service
    rabbitmq.createChannel(function(err, ch) {
      channel = ch;
      ch.assertQueue(q, {durable: false});
    });

    // Listen for changes in the related tenants
    // and propagate them to the synchronizer
    emitter.on('rest-service.tenant.save', function(tenant){
      channel.sendToQueue(q, new Buffer(JSON.stringify(tenant)));
    });
  };

  module.exports = {
    init: init
  };

})(); 