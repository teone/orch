var express = require('express');
var router = express.Router();
var onboardCtrl = require('../controllers/onboarding.js');

router.post('/utility/onboard', function (req, res) {

  var service = require('../' + req.body.service);

  onboardCtrl.onboardService(service, function(err, service){
    onboardCtrl.onboardSynchronizer('../' + req.body.synchronizer, function(err, sync){
      if(err){
        return res.send(err);
      }
      res.send(sync);
    });
  });

});

module.exports = router;
