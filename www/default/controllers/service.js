var Service = require('../models/service.js');

exports.query = function(done){
  Service.find(function(err, services){
    if(err){
      return done(err);
    }
    return done(null, services);
  });
};

exports.create = function(service, done){
  var model = new Service(service);

  model.save(function(err){
    if(err){
      done(err);
    }
    done(null, model);
  })
};
