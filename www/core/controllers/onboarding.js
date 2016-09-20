var Docker = require('dockerode');
var docker = new Docker();
var fs = require('fs');
var path = require('path');
var rabbit = require('../config/rabbitmq.js');
var serviceCtrl = require('../controllers/service.js');
var emitter = require('../config/emitter.js');
var P = require('bluebird');

var onboardService = function(service, done){
  // Start the synchronizer container
  onboardSynchronizer(service)
  .then(function(sync){
    // Extend API
    return onboardApi(service.api)
  })
  .then(function(api){
    // Save a reference to the service
    return saveService(service)
  })
  .then(function(model){
    return done(null, model); 
  })
  .catch(done);
};

// Extend core APIs using Service defined APIs
var onboardApi = P.promisify(function(serviceModule, done){
  var service = require('../' + serviceModule);
  var app = require('../server.js');
  try {
    service.init(app, emitter, rabbit.get());
    return done();
  }
  catch(e){
    return done(e);
  }
});

// Create a Docker container to host the synchronizer
var onboardSynchronizer = P.promisify(function(service, done){

  var syncFolder = path.join(__dirname, '../' + service.synchronizer);
  
  docker.run('node', ['bash', '-c', 'cd /sync; npm install; npm start'], [process.stdout, process.stderr], {
    name: 'synchronizer-' + service.name,
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
});

// Store a reference in core for active service
var saveService = P.promisify(function(service, done){
  serviceCtrl.create({name: service.name}, function(err, model){
    if(err){
      return done(err);
    }
    return done(model);
  })
});

module.exports = {
  onboardService: onboardService,
  onboardApi: onboardApi,
  onboardSynchronizer: onboardSynchronizer,
}