(function () {
  'use strict';
  var channel,
    q = 'example-service',
    qt = 'example-service-tenant';

  var init = function(app, emitter){
    app.get('/sample-service', function (req, res) {
      res.send('Hello My Service!');
    });

    app.post('/sample-service', function(req, res){
      channel.sendToQueue(q, new Buffer(req.body.msg));
      console.log(" [x] Sent '" + req.body.msg + "'");
      res.send(req.body.msg);
    });

    emitter.on('tenant.save', function(tenant){
      // TODO check that this is a tenant of my service (name-space the events??)
      channel.sendToQueue(qt, new Buffer(JSON.stringify(tenant)));
    });
  };

  var pubsub = function(conn){
    conn.createChannel(function(err, ch) {
      channel = ch;
      ch.assertQueue(q, {durable: false});
    });
  };

  module.exports = {
    init: init,
    pubsub: pubsub
  };

})(); 