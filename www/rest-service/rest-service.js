(function () {
  'use strict';
  var mongoose = require('../core/config/mongo.js');
  var P = require('../core/node_modules/bluebird');
  var channel;
  var q = 'rest-service';
  var qt = 'rest-tenant';

  var init = function(app, emitter, rabbitmq){

    // Create a rabbitMq channel for this service
    rabbitmq.createChannel(function(err, ch) {
      channel = ch;
      ch.assertQueue(q, {durable: false});
      ch.assertQueue(qt, {durable: false});

      // listening for events from the synchronizer
      ch.consume(qt, function(msg) {
        saveGif(JSON.parse(msg.content.toString()))
        .then(gif => {
          console.log(`${gif.name} saved!`);
        })
      });
    });

    // Listen for changes in the related tenants
    // and propagate them to the synchronizer
    emitter.on('rest-service.tenant.save', function(tenant){
      channel.sendToQueue(q, new Buffer(JSON.stringify(tenant)));
    });

    // Return all the Gifs for a particular tenant
    app.get('/rest-service/gif/:tenant', function (req, res) {

      if(!req.params.tenant){
        res.status(500).send('You have to specify a tenant');
      }

      Gif.find({tenantName: req.params.tenant}, function(err, gifs){
        if(err){
          res.status(500).send(err);
        }
        res.send(gifs);
      });
    });
  };

  // GIF Model
  var gifSchema = mongoose.Schema({
    name: String,
    url: String,
    tenantId: mongoose.Schema.Types.ObjectId,
    tenantName: String
  });

  var Gif = mongoose.model('Gif', gifSchema);

  // GIF Controller
  const saveGif = P.promisify(function(gif, done){
    var model = new Gif(gif);

    model.save(function(err){
      if(err){
        return done(err);
      }
      return done(null, model);
    })
  });

  module.exports = {
    init: init,
    Gif: Gif
  };

})(); 