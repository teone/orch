var Docker = require('dockerode');
var fs = require('fs');
var path = require('path');

exports.onboardService = function(service, done){
  var app = require('../server.js');
  service.init(app);
  return done();
};

exports.onboardSynchronizer = function(syncFolder, done){
  var docker = new Docker();
  
  docker.createContainer({
    Image: 'ubuntu',
    Cmd: ['/bin/bash'],
    name: 'ubuntu-test',
    // Volumes: [
    //   {'../../sample-service/synchronizer/': '/synchronizer'}
    // ]
  }, function (err, container) {
    if (err) {
      return done(err);
    }

    container.start(function (err, data) {
      if (err) {
        return done(err);
      }
      return done(null, data);
    });
  });
};