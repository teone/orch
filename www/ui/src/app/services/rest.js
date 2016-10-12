(function () {
  const baseUrl = 'http://10.0.33.34:3000';
  'use strict';
  angular.module('orch')
  .service('Services', function($resource){
    return $resource(`${baseUrl}/core/services`);
  })
  .service('Tenants', function($resource){
    return $resource(`${baseUrl}/core/tenants`);
  })
})(); 