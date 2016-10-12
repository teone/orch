(function () {
  angular.module('orch')
  .component('servicesList', {
    restrict: 'E',
    template: `
      <div class="row">
        <div class="col-xs-12">
          <xos-table data="vm.services" config="vm.tableCfg"></xos-table>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <h3>Onboard a service:</h3>
          <form ng-submit="vm.onboard(vm.serviceToOnboard)">
            <div class="row">
              <div class="col-sm-8">
                <select ng-model="vm.serviceToOnboard" class="form-control">
                  <option value="basic">Basic Service</option>
                  <option value="rest">Rest Service</option>
                  <option value="cloud">Cloud Service</option>
                </select>
              </div>
              <div class="col-sm-4 text-right">
                <button type="button" class="btn btn-success" ng-click="vm.onboard(vm.serviceToOnboard)">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    `,
    bindToController: true,
    controllerAs: 'vm',
    controller: function($http, Services, Onboard, Socket){
      this.services = [];
      Services.query().$promise
      .then((services) => {
        this.services = services;
      });

      this.tableCfg = {
        columns: [
          {
            label: 'Service Name',
            prop: 'name'
          }
        ],
        classes: 'table table-striped table-bordered'
      };

      this.onboard = (service) => {
        Onboard.service(service);
      };

      Socket.on('service.save', (service) => {
        this.services.push(service);
      });

      Socket.on('connect', function(){
        console.log('Socket connected');      
      });
    }
  });
})(); 