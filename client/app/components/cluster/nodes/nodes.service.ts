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
    let listActiveNodes = function() {
      return DataService.callGuzzleAPI(this.selectedClusterID, 'ListActiveNodes')
        .then(function(response) {
          return response.nodes.map(function(node) {
          node.nodeType = node.platformInfo.nodeType;
          return node;
        });
      });
    };

    let columns = [
      {key: 'nodeID', label: 'ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
      {key: 'name', label: 'Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'nodeType', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'softwareVersion', label: 'Version', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'serviceTag', label: 'Service Tag', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'mip', label: 'Management IP', format: {filter: 'string'}},
      {key: 'cip', label: 'Cluster IP', format: {filter: 'string'}},
      {key: 'sip', label: 'Storage IP', format: {filter: 'string'}},
      {key: 'ipcPort', label: 'Replication Port', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}}
    ];

    let nodeTableService = new SFTableService(listActiveNodes, columns, false);

    nodeTableService.selectedClusterID = null;

    nodeTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };

    return nodeTableService;
  }
})();
