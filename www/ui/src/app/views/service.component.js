(function () {
  angular.module('orch')
  .component('servicesList', {
    restrict: 'E',
    template: `<xos-table data="vm.services" config="vm.tableCfg"></xos-table>`,
    bindToController: true,
    controllerAs: 'vm',
    controller: function(Services){
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
    }
  });
})(); 