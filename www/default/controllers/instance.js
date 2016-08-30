var Instance = require('../models/instance.js');

exports.create = function(instance, done){
  var model = new Instance(instance);

  model.save(function(err){
    if(err){
      done(err);
    }
    done(null, model);
  })
};

exports.query = function(done){
  Instance.find(function(err, instances){
    if(err){
      return done(err);
    }
    return done(null, instances);
  });
}
