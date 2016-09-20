var Docker = require('dockerode');
var docker = new Docker();
var fs = require('fs');
var path = require('path');
var rabbit = require('../config/rabbitmq.js');
var serviceCtrl = require('../controllers/service.js');
var emitter = require('../config/emitter.js');

// TODO promisify
var onboardService = function(service, done){
  onboardSynchronizer('../' + service.synchronizer, function(err, sync){
    if(err){
      return done(err);
    }
    onboardApi(service.api, function(err, api){
      if(err){
        return done(err);
      }
      saveService(service, function(err, model){
        if(err){
          return done(err);
        }
        return done(null, model); 
      })
    });
  });
};

var onboardApi = function(serviceModule, done){
  var service = require('../' + serviceModule);
  var app = require('../server.js');
  service.init(app, emitter);
  service.pubsub(rabbit.get());
  return done();
};

var onboardSynchronizer = function(syncFolder, done){

  syncFolder = path.join(__dirname, syncFolder);
  
  docker.run('node', ['bash', '-c', 'cd /sync; npm install; npm start'], [process.stdout, process.stderr], {
    name: 'synchronizer-' + syncFolder,
    Volumes: {
      '/sync': {}
    },
    "HostConfig": {
       "Binds": [syncFolder + ':/sync']
    },
    "ExposedPorts": { 
      "80/tcp": {} 
    },
    "PortBindings": { 
      "80/tcp": [
        { "HostPort": "8080" }
      ]
    }
  },
  function (err, data, container) {
    console.log('err: ', err);
    console.log('data: ', data);
    console.log('container: ', container);
    // TODO handle container failure
  })
  .on('container', function (container) {
    return done();
  });
};

var saveService = function(service, done){
  serviceCtrl.create({name: service.name}, function(err, model){
    if(err){
      return done(err);
    }
    return done(model);
  })
}

module.exports = {
  onboardService: onboardService,
  onboardApi: onboardApi,
  onboardSynchronizer: onboardSynchronizer,
}