(function () {
  'use strict';
  var io;
  setTimeout(function() {
    // we need to wait the server to be started
    var server = require('../server').server;

    // INSTANTIATE SOCKET.IO
    // =============================================================================

    io = require('socket.io').listen(server);

    // LISTEN TO "CONNECTION" EVENT (FROM SOCKET.IO)
    // =============================================================================

    io.on('connection', function (socket) {
      socket.emit('connected', {message : 'Welcome to Orch'});
    });
  }, 1000);

  module.exports = {
    getSocket: () => io
  };

})(); 