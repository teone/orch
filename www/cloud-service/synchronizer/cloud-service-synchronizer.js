(function () {
  'use strict';

  const amqp = require('amqplib/callback_api');
  const P = require('bluebird');
  const Docker = require('dockerode');
  const docker = new Docker();

  const createTenantContainer = (port) => {
    docker.run('node', ['bash', '-c', 'sleep 86400'], [process.stdout, process.stderr], {
      "ExposedPorts": { 
        "80/tcp": {} 
      },
      "PortBindings": { 
        "80/tcp": [
          { "HostPort": port }
        ]
      }
    });
  };

  amqp.connect('amqp://172.17.0.2', function(err, conn) {
    conn.createChannel(function(err, ch) {
      const q = 'cloud-service';
      var qt = 'cloud-tenant';

      ch.assertQueue(q, {durable: false});
      ch.assertQueue(qt, {durable: false});
      console.log(" [*] Waiting for tenants in %s.", q);
      ch.consume(q, function(msg) {
        const tenant = JSON.parse(msg.content.toString());
        console.log(" [x] Tenant updated %s", tenant.name);

        createTenantContainer(9999);
        
          ch.sendToQueue(qt, new Buffer(JSON.stringify(gifModel)))
      }, {noAck: true});
    });
  });
})(); 