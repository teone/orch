(function () {
  'use strict';
  angular.module('orch')
  .component('orchNav', {
    restrict: 'E',
    template: `
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li ng-class="{active: vm.path === '/'}"><a href="/">Services</a></li>
              <li ng-class="{active: vm.path === '/tenants'}"><a href="#/tenants">Tenants</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </nav>
    `,
    bindToController: true,
    controllerAs: 'vm',
    controller: function($location, $rootScope){
      $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
        this.path = $location.path();
      })
    }
  });
})(); 