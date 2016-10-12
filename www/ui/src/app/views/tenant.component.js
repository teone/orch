(function () {
  angular.module('orch')
  .component('tenantsList', {
    restrict: 'E',
    template: `<xos-table data="vm.tenants" config="vm.tableCfg"></xos-table>`,
    bindToController: true,
    controllerAs: 'vm',
    controller: function(Tenants){
      Tenants.query().$promise
      .then((tenants) => {
        this.tenants = tenants;
      });

      this.tableCfg = {
        columns: [
          {
            label: 'Tenant Name',
            prop: 'name'
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
        classes: 'table table-striped table-bordered'
      };
    }
  });
})(); 