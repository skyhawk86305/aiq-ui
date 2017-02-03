(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('APICollectionTableService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      APICollectionTableService
    ]);

  function APICollectionTableService(SFTableService, SFFilterComparators, DataService) {
    let listAPICollections = function() {
      return DataService.callGuzzleAPI(this.selectedClusterID);
    };

    let columns = [
      {key: 'source', label: 'Element API Method', filterComparators: SFFilterComparators.STRING_DEFAULT, format: {filter: 'apiCollectionLink'}},
      {key: 'ingestedTime', label: 'Last Updated', format: {filter: 'aiqDate', args:['yyyy-MM-dd HH:mm:ss']}}
    ];

    let apiCollectionTableService = new SFTableService(listAPICollections, columns, false);

    apiCollectionTableService.selectedClusterID = null;

    apiCollectionTableService.update = function(clusterID) {
      this.selectedClusterID = parseInt(clusterID, 10);
    };

    return apiCollectionTableService;
  }
})();
