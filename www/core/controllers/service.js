var Service = require('../models/service.js');

exports.query = function(done){
  Service.find(function(err, services){
    if(err){
      return done(err);
    }
    return done(null, services);
  });
};

exports.get = function(service, done){
  Service.find(service, function(err, service){
    if(err){
      return done(err);
    }
    return done(null, service[0]);
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
