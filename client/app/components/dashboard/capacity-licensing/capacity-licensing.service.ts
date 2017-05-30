(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('CapacityLicensingService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      '$filter',
      CapacityLicensingService
    ]);

  function CapacityLicensingService(SFTableService, SFFilterComparators, DataService, $filter) {
    const columns = [
      { label: 'Customer ID', key: 'customerID', filterComparators: SFFilterComparators.INTEGER_DEFAULT },
      { label: 'Customer Name', key: 'customerName', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Number of Capacity Licensed Nodes', key: 'licensedNodes', filterComparators: SFFilterComparators.INTEGER_DEFAULT, format: { filter: 'string' } },
      { label: 'Entitled Licensed Capacity', key: 'entitledCapacity', format: { filter: 'bytes' } },
      { label: 'Provisioned Licensed Capacity', key: 'provisionedLicensedCapacity', format: { filter: 'bytes' } },
      { label: 'Details', key: 'detailsLink', width: 100, sortable: false, nonData: true, titleValue: 'Click to View Details' },
    ];

    function listCustomerLicensingInfo() {
      return DataService.callAPI('ListCustomerLicensingInfo')
        .then( ({ customers = [] }) =>
          customers.map( customer => Object.assign({}, customer, {
            licensedNodes: customer.licensedNodes || 0,
            detailsLink: $filter('capacityLicensingDetailsLink')(customer.customerID),
          }))
        );
    }

    return new SFTableService(listCustomerLicensingInfo, columns, false);
  }

})();
