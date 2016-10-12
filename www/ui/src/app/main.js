(function () {
  angular.module('orch', [
    'ngResource',
    'ngCookies',
    'ui.router',
    'xos.helpers',
    'ngAnimate',
    'btford.socket-io'
  ])
  .config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
    .state('services', {
      url: '/',
      template: '<services-list></services-list>'
    })
    .state('tenants', {
      url: '/tenants',
      template: '<tenants-list></tenants-list>'
    });
    $urlRouterProvider.otherwise('/');
  });
})(); 