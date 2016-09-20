var mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
  name: String,
  attributes: mongoose.Schema.Types.Mixed
});

var Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
