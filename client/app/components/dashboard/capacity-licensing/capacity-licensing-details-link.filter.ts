(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('capacityLicensingDetailsLink', [ function() {
      return function(customerID) {
        if (!customerID) return;

        const url = `#/dashboard/capacityLicensing/${customerID}`;
        return `
          <a class="view-details-link"
              href="${url}"
              aria-label="View capacity licensing details for the customer">
            <i class="fa fa-arrow-right right-arrow" aria-hidden="true"></i>
          </a>
        `;
      };
    }]);
})();


