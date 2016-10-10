(function () {
  'use strict';

  const amqp = require('amqplib/callback_api');
  const P = require('bluebird');
  const Docker = require('dockerode');
  const docker = new Docker();
  const path = require('path');
  const fs = P.promisifyAll(require("fs"));

  console.log('Cloud Synchronizer READY!!');

  const writeTenantIndex = (tenant) => {
    console.log(tenant);
    fs.mkdirAsync(path.join(__dirname, 'tenants', tenant.name))
    .then(() => {
      fs.writeFile(path.join(__dirname,'tenants',  tenant.name, 'index.html'), tenant.attributes.message, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
      });
    })
  };

  const createTenantContainer = (tenant, port) => {
    console.log(`creating container for cloud tenant:  ${tenant.name} on port: ${port}`);
    docker.run('node', ['bash', '-c', 'sleep 86400'], [process.stdout, process.stderr], {
      name: tenant.name,
      "ExposedPorts": { 
        "80/tcp": {} 
      },
      "PortBindings": { 
        "80/tcp": [
          { "HostPort": port.toString() }
        ]
      }
    },
    function (err, data, container) {
      console.log('tenant err: ', err);
      console.log('tenant data: ', data);
      console.log('tenant container: ', container);
      // TODO handle container failure
    })
    .on('container', function (container) {
      console.log('container created');
      writeTenantIndex(tenant);
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

        createTenantContainer(tenant, 9999);
        
          // ch.sendToQueue(qt, new Buffer(JSON.stringify(gifModel)))
      }, {noAck: true});
    });
  });
})(); 