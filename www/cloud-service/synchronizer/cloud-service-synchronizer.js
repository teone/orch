(function () {
  'use strict';

  const amqp = require('amqplib/callback_api');
  const P = require('bluebird');
  const Docker = require('dockerode');
  const docker = new Docker();
  const path = require('path');
  const fs = P.promisifyAll(require("fs"));

  const syncFolder = '/var/www/cloud-service/synchronizer/'

  console.log('Cloud Synchronizer READY!!');

  const mkdir = P.promisify(function (dirPath, done) {
    fs.mkdirAsync(dirPath)
    .then((res) => {
      return done();
    })
    .catch(e => {
      if ( e.code != 'EEXIST' ){
        return done(e);
      };
      // if the dir already exist it's OK
      return done();
    })
  });

  const writeTenantIndex = (tenant) => {
    mkdir(path.join(__dirname, 'tenants', tenant.name))
    .then(() => {
      return fs.writeFileAsync(path.join(__dirname,'tenants',  tenant.name, 'index.html'), tenant.attributes.message);
    })
    .then(() => {
      console.log("The file was saved!");
    })
    .catch(e => {
      throw new Error(e);
    })
  };

  const createTenantContainer = (tenant, port) => {
    console.log(`creating container for cloud tenant:  ${tenant.name} on port: ${port}`);

    // reference to the host folder
    const apacheRoot = path.join(syncFolder, 'tenants', tenant.name);

    docker.run('node', ['bash', '-c', 'sleep 86400'], [process.stdout, process.stderr], {
      name: tenant.name,
      "ExposedPorts": { 
        "80/tcp": {} 
      },
      "PortBindings": { 
        "80/tcp": [
          { "HostPort": port.toString() }
        ]
      },
      Volumes: {
        '/var/www': {}
      },
      "HostConfig": {
        "Binds": [
          apacheRoot + ':/var/www',
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