// jscs:disable maximumLineLength

(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('NodesService', [
      '$q',
      '$filter',
      'SFService',
      'DataService',
      'ClusterSelectService',
      NodesService
    ]);

  function NodesService($q, $filter, SFService, DataService, ClusterSelectService) {
    var self = this;
    SFService.call(self);
    self.modelName = 'node';
    self.filterName = 'aiqData';
    self.state = 'loading';
    self.emptyText = 'No nodes detected in this state.';

    self.loadModels = function() {
      var deferred = $q.defer();

      if(ClusterSelectService.selectedCluster) {
        self.state = 'loading';
        DataService.callAPI('ListActiveNodes', {clusterID:ClusterSelectService.selectedCluster.clusterID})
          .then(function(res) {
            var vms = res.nodes;
            self.state = vms && vms.length > 0 ? 'loaded' : 'empty';
            self.setData($filter('orderBy')(vms, '-nodeID'));
            deferred.resolve();
          }).catch(function(err) {
            self.errorObject = err;
            self.state = 'error';
            deferred.reject(err);
          });
      } else {
        self.errorObject = {message: 'You must first select a cluster'};
        self.state = 'error';
        deferred.reject('You must first select a cluster');
      }
      return deferred.promise;
    };

    self.properties = [
      {key: 'nodeID', label: 'ID', filter: self.defaultIntegerOperators, data: {type: 'text', format: 'string'}},
      {key: 'name', label: 'Name', filter: self.defaultStringOperators, data: {type:'text', format: 'string'}},
      {key: 'nodeType', label: 'Type', filter: self.defaultStringOperators, data: {type:'text', format: 'string'}},
      {key: 'softwareVersion', label: 'Version', filter: self.defaultStringOperators, data: {type:'text', format: 'string'}},
      {key: 'serviceTag', label: 'Service Tag', filter: self.defaultStringOperators, data: {type:'text', format: 'string'}},
      {key: 'mip', label: 'Management IP', filter: self.defaultStringOperators, data: {type:'text', format: 'string'}},
      {key: 'cip', label: 'Cluster IP', filter: self.defaultStringOperators, data: {type: 'text', format: 'string'}},
      {key: 'sip', label: 'Storage IP', filter: self.defaultStringOperators, data: {type: 'text', format: 'string'}},
      {key: 'ipcPort', label: 'Replication Port', filter: self.defaultIntegerOperators, data: {type:'text', format: 'string'}}
    ];
  }
})();
