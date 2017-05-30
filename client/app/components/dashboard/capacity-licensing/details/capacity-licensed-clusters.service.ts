(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('CapacityLicensedClusterService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      CapacityLicensedClusterService
    ]);

  function CapacityLicensedClusterService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      { label: 'Cluster ID', key: 'clusterID', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Cluster Name', key: 'clusterName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Provisioned Licensed Capacity', key: 'clusterProvisionedLicenseCapacity', format: { filter: 'bytes', args: [false, 2] } },
      { label: '% of Total Provisioned Licensed Capacity', key: 'clusterCapacityUtilization', format: { filter: 'percent', args: [ 1, true ] } },
    ];

    function listClusterLicensingInfo() {
      return DataService.callAPI('ListClusterLicensingInfo', { customerID: this.customerID } )
        .then( ({ clusters = [] }) => _.sortBy(clusters, 'clusterID') );
    }

    const service = new SFTableService(listClusterLicensingInfo, columns, false);
    service.customerID = null;
    service.update = function(customerID: Number) {
      this.customerID = customerID;
    };
    return service;
  }

})();
