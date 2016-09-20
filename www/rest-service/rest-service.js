(function () {
  'use strict';
  var mongoose = require('mongoose');
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

    // Return all the Gifs for a particular tenant
    app.get('/sample-service/gif/:tenant', function (req, res) {
      Gif.find({tenantName: tenant}, function(err, gifs){
        if(err){
          res.status(500).send(err);
        }
        res.send(tenant);
      });
    });
  };

  var gifSchema = mongoose.Schema({
    name: String,
    url: String,
    tenantId: mongoose.Schema.Types.ObjectId,
    tenantName: mongoose.Schema.Types.ObjectId
  });

  var Gif = mongoose.model('Gif', gifSchema);

  module.exports = {
    init: init,
    Gif: Gif
  };

})(); 