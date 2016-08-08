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
      {key: 'nodeID', label: 'ID', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'name', label: 'Name', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'nodeType', label: 'Type', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'softwareVersion', label: 'Version', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'serviceTag', label: 'Service Tag', filter: SFFilterComparators.STRING_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'mip', label: 'Management IP', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'cip', label: 'Cluster IP', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'sip', label: 'Storage IP', format: {filter: 'aiqData', params: {type: 'string'}}},
      {key: 'ipcPort', label: 'Replication Port', filter: SFFilterComparators.INTEGER_DEFAULT, format: {filter: 'aiqData', params: {type: 'string'}}}
    ];

    var nodeTableService = new SFTableService(listActiveNodes, columns, false);

    nodeTableService.selectedClusterID = null;

    nodeTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return nodeTableService;
  }
})();
