(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('CapacityLicensingService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      CapacityLicensingService
    ]);

  function CapacityLicensingService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      { label: 'Customer ID', key: 'customerID', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Customer Name', key: 'customerName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Number of Capacity Licensed Nodes', key: 'licensedNodes', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: { filter: 'string' } },
      { label: 'Entitled Licensed Capacity', key: 'entitledCapacity', format: { filter: 'bytes' } },
      { label: 'Provisioned Licensed Capacity', key: 'provisionedLicensedCapacity', format: { filter: 'bytes' } },
    ];

    function listCustomerLicensingInfo() {
      return DataService.callAPI('ListCustomerLicensingInfo')
        .then( ({ customers = [] }) => customers );
    }

    return new SFTableService(listCustomerLicensingInfo, columns, false);
  }

})();
