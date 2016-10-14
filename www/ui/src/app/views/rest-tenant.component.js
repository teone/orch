(function () {
  'use strict';
  const baseUrl = 'http://10.0.33.34:3000';
  angular.module('orch')
  .component('restTenant',{
    restrict: 'E',
    template: `
      <xos-table data="vm.tenants" config="vm.tableCfg"></xos-table>
      <form>
        <div class="row">
          <div class="col-xs-12">
            <h3>Fetch image from glyphy by query:</h3>
          </div>
          <div class="col-xs-12">
            <input class="form-control" type="text" ng-model="vm.q"/>
          </div>
          <div class="col-xs-12">
            <a ng-click="vm.create(vm.q)" class="btn btn-success">Create</a>
          </div>
        </div>
      </form>
      <div class="row">
        <div class="col-sm-2" ng-repeat="gif in vm.gifs">
          <img src="{{gif.url}}" class="img-responsive" />
        </div>
      </div>
    `,
    bindToController: true,
    controllerAs: 'vm',
    controller: function($http, Services, Tenants, Socket){
      var i = 1;
      Services.query().$promise
      .then((services) => {
        services = services.filter(s => s.name === 'rest-service');
        this.serviceId = services[0]._id;
        return Tenants.query().$promise
      })
      .then((tenants) => {
        this.tenants = tenants.filter(t => t.serviceId === this.serviceId);
      });

      Socket.on('tenant.save', (tenant) => {
        this.tenants.push(tenant);
      });

      this.tableCfg = {
        columns: [
          {
            label: 'Tenant Name',
            prop: 'name',
          },
          {
            label: 'Related service id',
            prop: 'serviceId'
          },
          {
            label: 'Additional Attributes',
            prop: 'attributes',
            type: 'object'
          }
        ],
        classes: 'table table-striped table-bordered',
        actions: [ // if defined add an action column
          {
            label: 'info',
            icon: 'search', // refers to bootstraps glyphicon
            cb: (tenant) => { // receive the model
              this.showTenantInfo(tenant);
            },
            color: 'green'
          }
        ],
      };

      this.create = (q) => {
        const data = {
          "name": `rest-service-tenant-${i}`,
          "attributes": {
            "q": q
          },
          "service": "rest-service"
        };
        $http.post(`${baseUrl}/core/tenants`, data);
        i = i + 1;
      };

      this.showTenantInfo = (tenant) => {
        $http.get(`http://10.0.33.34:3000/rest-service/gif/${tenant.name}`)
        .then((res) => {
            this.gifs = res.data;
        })
      }
    }
  });
})(); 