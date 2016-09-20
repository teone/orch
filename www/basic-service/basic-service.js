(function () {
  'use strict';
  var channel;
  var q = 'basic-service';

  var init = function(app, emitter, rabbitmq){

    // Extend the core API with a custom endpoint
    app.post('/basic-service/send', function(req, res){
      channel.sendToQueue(q, new Buffer(req.body.msg));
      console.log(" [x] Sent '" + req.body.msg + "'");
      res.send('Event Sent!');
    });

    // Create a rabbitMq channel for this service
    rabbitmq.createChannel(function(err, ch) {
      channel = ch;
      ch.assertQueue(q, {durable: false});
    });
  };

  module.exports = {
    init: init
  };

})(); 