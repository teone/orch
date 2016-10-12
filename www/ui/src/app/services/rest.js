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
  .service('Onboard', function($http){
    this.service = (serviceName) => {
      const data = {
        name: `${serviceName}-service`,
        api:`../${serviceName}-service/${serviceName}-service.js`,
        synchronizer: `../${serviceName}-service/synchronizer/`
      }
      $http.post(`${baseUrl}/utility/onboard`, data)
    }
  })
})(); 