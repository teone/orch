var amqp = require('amqplib/callback_api');
var Docker = require('dockerode'); //TODO connecto to parent docker
var docker = new Docker({host: 'http://172.17.0.3'});

setUpContainer = function(tenant){
  docker.run('node', ['bash', '-c', 'sleep 846000'], [process.stdout, process.stderr], {
    name: 'tenant-' + tenant._id,
  },
  function (err, data, container) {
    console.log('sample-service err: ', err);
    console.log('sample-service data: ', data);
    console.log('sample-service container: ', container);
  })
  .on('container', function (container) {
    console.log('container tenant-' + tenant._id + ' created');
  });
};

amqp.connect('amqp://172.17.0.2', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'example-service';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s.", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });

  conn.createChannel(function(err, ch) {
    var q = 'example-service-tenant';

    ch.assertQueue(q, {durable: false});
    ch.consume(q, function(msg) {
      var tenant = JSON.parse(msg.content.toString());

      setUpContainer(tenant);
    }, {noAck: true});
  });
});