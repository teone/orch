var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var onboarding = require('./views/onboarding.js')
var instances = require('./views/instance.js')
var services = require('./views/service.js')
var tenants = require('./views/tenant.js')

var rabbit = require('./config/rabbitmq.js');

var mongoose = require('./config/mongo.js');

rabbit.init();

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/', onboarding);
app.use('/', instances);
app.use('/', services);
app.use('/', tenants);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;