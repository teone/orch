var Tenant = require('../models/tenant.js');

exports.query = function(done){
  Tenant.find(function(err, tenants){
    if(err){
      return done(err);
    }
    return done(null, tenants);
  });
}

exports.create = function(tenant, done){
  var model = new Tenant(tenant);

  model.save(function(err){
    if(err){
      done(err);
    }
    done(null, model);
  })
};
