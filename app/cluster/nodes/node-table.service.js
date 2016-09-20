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
      {key: 'nodeID', label: 'ID', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'name', label: 'Name', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'nodeType', label: 'Type', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'softwareVersion', label: 'Version', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'serviceTag', label: 'Service Tag', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'mip', label: 'Management IP', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'cip', label: 'Cluster IP', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'sip', label: 'Storage IP', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'ipcPort', label: 'Replication Port', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}}
    ];

    var nodeTableService = new SFTableService(listActiveNodes, columns, false);

    nodeTableService.selectedClusterID = null;

    nodeTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return nodeTableService;
  }
})();
