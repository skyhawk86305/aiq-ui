(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('UnassociatedClustersService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      UnassociatedClustersService
    ]);

  function UnassociatedClustersService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      { label: 'Cluster ID', key: 'clusterID', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Cluster Name', key: 'clusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Cluster UUID', key: 'clusterUUID', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Version', key: 'clusterVersion', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Last Updated', key: 'lastUpdateTime', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Add to Customer Account', key: 'addToCustomer'}
    ];

    function listUnassociatedClusters() {
      return DataService.callAPI('ListUnassociatedClusters')
        .then( ({ clusters = [] }) =>
          clusters.map(cluster => Object.assign({}, cluster, {
            addToCustomer: `
              <a class="associate-cluster-link"
                  aria-label="Associate cluster with a customer.">
                <i class="fa fa-plus-circle" aria-hidden="true"</i>
              </a>
            `
          }))
        );
    }

    return new SFTableService(listUnassociatedClusters, columns, false);
  }
})();
