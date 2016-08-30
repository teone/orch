var Docker = require('dockerode');
var fs = require('fs');
var path = require('path');
var docker = new Docker();

exports.onboardService = function(service, done){
  var app = require('../server.js');
  service.init(app);
  return done();
};

exports.onboardSynchronizer = function(syncFolder, done){

  syncFolder = path.join(__dirname, syncFolder);
  
  docker.run('node', ['bash', '-c', 'node /sync/example.js'], [process.stdout, process.stderr], {
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
    return done();
  });
};