var Instance = reuquire('../models/instance.js');

exports.create = function(instanace){
  var model = new Instance(instance);

  instance.save(function(err){
    if(err){
      console.log(err);
    }
    console.log(instance)
  })
}
