(function () {
  'use strict';

  const _ = require('lodash');

  const moduleName = 'aiqUi';
  const serviceName = 'SuppressedClustersService';
  const deps = [ 'SFTableService', 'SFFilterComparators', 'DataService' ];

  class SuppressedClustersService {

    private columns = [
      { label: 'Customer Name', key: 'customerName', filterComparators: this.SFFilterComparators.STRING_DEFAULT },
      { label: 'Cluster ID', key: 'clusterID', filterComparators: this.SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Cluster Name', key: 'clusterName', filterComparators: this.SFFilterComparators.STRING_DEFAULT },
      { label: 'Start Time', key: 'start', format: { filter: 'aiqDate' } },
      { label: 'End Time', key: 'end', format: { filter: 'aiqDate' } },
    ];

    constructor (private SFTableService, private SFFilterComparators, private DataService) {
      return new SFTableService(() => this.listActiveSuppressions(), this.columns);
    }

    listActiveSuppressions() {
      return this.DataService.callAPI('ListActiveSuppressions')
        .then( response => _.get(response, 'suppressions') );
    }

  }

  angular
    .module(moduleName)
    .service(serviceName, [ ...deps, SuppressedClustersService ]);

})();
