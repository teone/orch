(function () {
  'use strict';
  var channel, q = 'hello';

  var init = function(app){
    app.get('/service', function (req, res) {
      res.send('Hello My Service!');
    });

    app.post('/service', function(req, res){
      channel.sendToQueue(q, new Buffer(req.body.msg));
      console.log(" [x] Sent '" + req.body.msg + "'");
      res.send(req.body.msg);
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