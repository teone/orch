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
            <a class="navbar-brand" href="#">Orch</a>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li 
                ng-repeat="route in vm.routes"
                ng-class="{active: vm.path === route.url}">
                <a href="#{{route.url}}">{{route.label}}</a>
              </li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </nav>
    `,
    bindToController: true,
    controllerAs: 'vm',
    controller: function($location, $rootScope, Socket){

      this.routes = [
        {
          label: 'Services',
          url: '/'
        },
        {
          label: 'Tenants',
          url: '/tenants'
        }
      ];

      this.serviceRoutes = {
        'rest-service': {
          label: 'Rest Tenants',
          url: '/rest-tenant'
        },
        'cloud-service': {
          label: 'Cloud Tenants',
          url: '/cloud-tenant'
        }
      }

      $rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
        this.path = $location.path();
      });

      Socket.on('service.save', (service) => {
        this.routes.push(this.serviceRoutes[service.name]);
      });
    }
  });
})(); 