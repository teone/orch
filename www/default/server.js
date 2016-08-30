var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/xos');

var onboarding = require('./views/onboarding.js')
var instances = require('./views/instance.js')

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/', instances);
app.use('/', onboarding);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;