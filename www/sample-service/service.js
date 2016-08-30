var init = function(app){
  console.log('init service');
  app.get('/service', function (req, res) {
    res.send('Hello My Service!');
  });
};

module.exports = {
  init: init
};
