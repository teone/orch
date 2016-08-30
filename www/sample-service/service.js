var init = function(app){
  app.get('/service', function (req, res) {
    res.send('Hello My Service!');
  });
};

module.exports = {
  init: init
};
