
exports.onboardService = function(service, done){
  var app = require('../server.js');
  service.init(app);
  return done();
};

exports.onboardSynchronizer = function(syncFolder, done){
  return done();
};