(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('UnregisteredClustersService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      UnregisteredClustersService
    ]);

  function UnregisteredClustersService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      { label: 'Cluster ID', key: 'clusterID', width: 100, format: { filter: 'aiqNumber', args: [0, true] }, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Cluster Name', key: 'clusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Cluster UUID', key: 'clusterUUID', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Version', key: 'clusterVersion', width: 100, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Last Updated', key: 'lastUpdateTime', width: 200, format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}, filterComparators: SFFilterComparators.INTEGER_DEFAULT },
    ];

    function listUnregisteredClusters() {
      return DataService.callAPI('ListUnregisteredClusters')
        .then( ({ clusters = [] }) => clusters );
    }

    return new SFTableService(listUnregisteredClusters, columns, false);
  }
})();
