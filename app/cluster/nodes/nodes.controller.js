(function () {
  'use strict';

  angular
    .module('aiqUi')
    .controller('NodesTableController', [
      '$rootScope',
      'NodesService',
      TableController
    ]);

  function TableController($rootScope, NodesService) {
    var self = this;
    self.service = NodesService;

    self.refreshTable = function() {
      self.service.loadModels().then(function() {
        if (self.service.tableIsVisible) {
          self.service.filterData();
        }
      });
    };

    self.refreshTable();
    $rootScope.$on('selectedClusterUpdated', self.refreshTable);
  }
})();
