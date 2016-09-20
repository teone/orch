var express = require('express');
var router = express.Router();
var tenantCtrl = require('../controllers/tenant.js');

router.get('/core/tenants', function(req, res, done){
  tenantCtrl.query(function(err, tenants){
    if(err){
      res.status(500).send(err);
    }
    res.send(tenants);
  })
});

router.post('/core/tenants', function(req, res, done){
  tenantCtrl.create(req.body, function(err, tenant){
    if(err){
      res.status(500).send(err);
    }
    res.send(tenant);
  })
});

router.put('/core/tenants/:id', function(req, res, done){
  tenantCtrl.update(req, function(err, tenant){
    if(err){
      res.status(500).send(err);
    }
    res.send(tenant);
  })
});

module.exports = router;