(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('NodeTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      NodeTableService
    ]);

  function NodeTableService(SFTableService, SFFilterComparators, DataService) {
    var listActiveNodes = function() {
      return DataService.callAPI('ListActiveNodes', {clusterID: this.selectedClusterID})
        .then(function(response) { return response.nodes; });
    };

    var columns = [
      {key: 'nodeID', label: 'ID', filter:SFFilterComparators.INTEGER_DEFAULT},
      {key: 'name', label: 'Name', filter:SFFilterComparators.STRING_DEFAULT},
      {key: 'nodeType', label: 'Type', filter:SFFilterComparators.STRING_DEFAULT},
      {key: 'softwareVersion', label: 'Version', filter:SFFilterComparators.INTEGER_DEFAULT},
      {key: 'serviceTag', label: 'Service Tag', filter:SFFilterComparators.STRING_DEFAULT},
      {key: 'mip', label: 'Management IP'},
      {key: 'cip', label: 'Cluster IP'},
      {key: 'sip', label: 'Storage IP'},
      {key: 'ipcPort', label: 'Replication Port', filter:SFFilterComparators.INTEGER_DEFAULT}
    ];

    var nodeTableService = new SFTableService(listActiveNodes, columns, false);

    nodeTableService.selectedClusterID = null;

    nodeTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return nodeTableService;
  }
})();
