var express = require('express');
var router = express.Router();
var onboardCtrl = require('../controllers/onboarding.js');

router.post('/utility/onboard', function (req, res) {
  onboardCtrl.onboardService(req.body, function(err, service){
    res.send(service);
  });
});

module.exports = router;
