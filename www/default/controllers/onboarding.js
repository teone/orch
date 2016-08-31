var Docker = require('dockerode');
var fs = require('fs');
var path = require('path');
var docker = new Docker();
var rabbit = require('../config/rabbitmq.js');

exports.onboardService = function(service, done){
  var app = require('../server.js');
  service.init(app);
  service.pubsub(rabbit.get());
  return done();
};

exports.onboardSynchronizer = function(syncFolder, done){

  syncFolder = path.join(__dirname, syncFolder);
  
  docker.run('node', ['bash', '-c', 'cd /sync; npm install; npm start'], [process.stdout, process.stderr], {
    name: 'ubuntu-test',
    Volumes: {
      '/sync': {}
    },
    "HostConfig": {
       "Binds": [syncFolder + ':/sync']
    }
  },
  function (err, data, container) {
    console.log('err: ', err);
    console.log('data: ', data);
    console.log('container: ', container);
  })
  .on('container', function (container) {
    return done();
  });
};