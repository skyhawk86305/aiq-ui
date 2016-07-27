(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('NodeTableService', [
      '$q',
      'SFTableService',
      'DataService',
      NodeTableService
    ]);

  function NodeTableService($q, SFTableService, DataService) {
    var listActiveNodes = function() {
      var deferred = $q.defer();
      DataService.callAPI('ListActiveNodes', {clusterID: this.selectedClusterID})
        .then(function(response) {
          deferred.resolve(response.nodes);
        }).catch(function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    var columns = [
      {key: 'nodeID', label: 'ID', widthPercentage: '11.11%'},
      {key: 'name', label: 'Name', widthPercentage: '11.11%'},
      {key: 'nodeType', label: 'Type', widthPercentage: '11.11%'},
      {key: 'softwareVersion', label: 'Version', widthPercentage: '11.11%'},
      {key: 'serviceTag', label: 'Service Tag', widthPercentage: '11.11%'},
      {key: 'mip', label: 'Management IP', widthPercentage: '11.11%'},
      {key: 'cip', label: 'Cluster IP', widthPercentage: '11.11%'},
      {key: 'sip', label: 'Storage IP', widthPercentage: '11.11%'},
      {key: 'ipcPort', label: 'Replication Port', widthPercentage: '11.11%'}
    ];

    var nodeTableService = new SFTableService(listActiveNodes, columns, false);

    nodeTableService.selectedClusterID = null;

    nodeTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID);
    };

    return nodeTableService;
  }
})();
