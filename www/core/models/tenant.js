(function () {
  'use strict';

  var mongoose = require('mongoose');
  var emitter = require('../config/emitter.js');
  var serviceCtrl = require('../controllers/service.js');

  var tenantSchema = mongoose.Schema({
    name: String,
    serviceId: mongoose.Schema.Types.ObjectId,
    attributes: mongoose.Schema.Types.Mixed,
    inSync: {
      type: mongoose.Schema.Types.Boolean,
      default: false
    }
  });

  tenantSchema.post('save', function(){

    var tenant = this;
    serviceCtrl.get({_id: this.serviceId}, function(err, service){
      if(err){
        return console.error(err);
      }
      emitter.emit(service.name + '.tenant.save', tenant);
    })
  })

  var Tenant = mongoose.model('Tenant', tenantSchema);

  module.exports = Tenant;

})(); 