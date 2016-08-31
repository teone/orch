var express = require('express');
var router = express.Router();
var serviceCtrl = require('../controllers/service.js');

router.get('/core/services', function(req, res, done){
  serviceCtrl.query(function(err, services){
    if(err){
      res.status(500).send(err);
    }
    res.send(services);
  })
});

module.exports = router;