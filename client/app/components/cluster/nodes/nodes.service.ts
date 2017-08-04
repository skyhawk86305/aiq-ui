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
      return DataService.callAPI('ListActiveNodes', {clusterID: this.selectedClusterID})
        .then(function(response) {
          return response.nodes;
      });
    };

    let columns = [
      {key: 'nodeID', label: 'ID', width: 60, filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqNumber', args: [0, true]}},
      {key: 'name', label: 'Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'nodeType', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'softwareVersion', width: 100, label: 'Version', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'serviceTag', label: 'Service Tag', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'string'}},
      {key: 'mip', label: 'Management IP', filterComparators: SFFilterComparators.IP_ADDRESS_DEFAULT, format: {filter: 'string'}},
      {key: 'cip', label: 'Cluster IP', filterComparators: SFFilterComparators.IP_ADDRESS_DEFAULT, format: {filter: 'string'}},
      {key: 'sip', label: 'Storage IP', filterComparators: SFFilterComparators.IP_ADDRESS_DEFAULT, format: {filter: 'string'}},
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
