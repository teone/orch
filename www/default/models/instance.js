var mongoose = require('mongoose');

var Instance = mongoose.model('Instance', { name: String, ip: String });

module.exports = Instance;
