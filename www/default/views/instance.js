var express = require('express');
var router = express.Router();
var instanceCtrl = require('../controllers/instance.js');

router.get('/core/instances', function(req, res, done){
  instanceCtrl.query(function(err, instances){
    if(err){
      res.status(500).send(err);
    }
    res.send(instances);
  })
});

router.post('/core/instances', function(req, res, done){
  instanceCtrl.create(req.body, function(err, instance){
    if(err){
      res.status(500).send(err);
    }
    res.send(instance);
  })
});

module.exports = router;