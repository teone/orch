(function () {
  'use strict';

  var mongoose = require('mongoose');
  var emitter = require('../config/emitter.js');
  var serviceCtrl = require('../controllers/service.js');

  var tenantSchema = mongoose.Schema({
    name: String,
    serviceId: mongoose.Schema.Types.ObjectId,
    attributes: mongoose.Schema.Types.Mixed
  });

  tenantSchema.post('save', function(){
    serviceCtrl.get({_id: this.serviceId}, function(err, service){
      if(err){
        return console.error(err);
      }
      emitter.emit(service.name + '.tenant.save', this);
    })
  })

  var Tenant = mongoose.model('Tenant', tenantSchema);

  module.exports = Tenant;

})(); 