(function () {
  'use strict';

  angular
    .module('aiqUi')
    .controller('NodesTableController', [
      'NodesService',
      TableController
    ]);

  function TableController(NodesService) {
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
  }
})();
