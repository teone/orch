(function () {
  'use strict';
  const baseUrl = 'http://10.0.33.34:3000';
  angular.module('orch')
  .factory('Socket', function (socketFactory) {
      var myIoSocket = io.connect(`${baseUrl}`);

      var mySocket = socketFactory({
          ioSocket: myIoSocket
      });

      return mySocket;
  });
})(); 