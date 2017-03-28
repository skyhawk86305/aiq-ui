(function () {
  'use strict';

  const _ = require('lodash');

  angular
    .module('aiqUi')
    .service('CapacityLicensedNodeService', [
      'SFTableService',
      'SFFilterComparators',
      'DataService',
      CapacityLicensedNodeService
    ]);

  function CapacityLicensedNodeService(SFTableService, SFFilterComparators, DataService) {
    const columns = [
      { label: 'Cluster Name', key: 'clusterName', format: { filter: 'string' }, filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Service Tag', key: 'serviceTag', filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Model', key: 'nodeType', format: { filter: 'string' }, filterComparators: SFFilterComparators.STRING_DEFAULT },
      { label: 'Raw Capacity', key: 'rawCapacity', format: { filter: 'bytes' } },
    ];

    function listLicensedNodes() {
      return DataService.callAPI('ListLicensedNodes', { customerID: this.customerID })
        .then( ({ licensedNodes = [] }) => _.sortBy(licensedNodes, 'clusterName') );
    }

    const service = new SFTableService(listLicensedNodes, columns, false);
    service.customerID = null;
    service.update = function(customerID: Number) {
      this.customerID = customerID;
    };
    return service;
  }

})();
