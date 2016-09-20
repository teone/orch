var Tenant = require('../models/tenant.js');
var serviceCtrl = require('../controllers/service.js');

exports.query = function(done){
  Tenant.find(function(err, tenants){
    if(err){
      return done(err);
    }
    return done(null, tenants);
  });
}

exports.create = function(tenant, done){

  if(!tenant.service){
    return done('Must specify a service');
  }

  serviceCtrl.get({name: tenant.service}, function(err, service){
    delete tenant.service;
    if(!service){
      done('specified service does not exist!')
    }
    tenant.serviceId = service._id;

    var model = new Tenant(tenant);

    model.save(function(err){
      if(err){
        return done(err);
      }
      return done(null, model);
    })
  });

};
