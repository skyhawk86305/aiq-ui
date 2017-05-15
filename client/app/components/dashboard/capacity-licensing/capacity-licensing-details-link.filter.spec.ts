'use strict';

describe('Capacity Licensing Details Link Filter', function() {
  beforeEach(angular.mock.module('aiqUi'));

  it('should return the correct link HTML when a valid customer ID is provided', inject(function($filter) {
    const result = $filter('capacityLicensingDetailsLink')(123);
    expect(result)
      .toEqual(`
          <a class="view-details-link"
              href="#/dashboard/capacityLicensing/123"
              aria-label="View capacity licensing details for the customer">
            <i class="fa fa-arrow-right right-arrow" aria-hidden="true"</i>
          </a>
        `);
  }));

  it('should return undefined when no customer ID is provided', inject(function($filter) {
    const result = $filter('capacityLicensingDetailsLink')();
    expect(result).toBeUndefined();
  }));
});

