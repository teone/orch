var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// NOTE move in separate config
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/xos');

var onboarding = require('./views/onboarding.js')
var instances = require('./views/instance.js')
var services = require('./views/service.js')

var rabbit = require('./config/rabbitmq.js');

rabbit.init();

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/', onboarding);
app.use('/', instances);
app.use('/', services);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;