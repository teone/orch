var mongoose = require('mongoose');

var instanceSchema = mongoose.Schema({
  name: String,
  ip: String
});

var Instance = mongoose.model('Instance', instanceSchema);

module.exports = Instance;
