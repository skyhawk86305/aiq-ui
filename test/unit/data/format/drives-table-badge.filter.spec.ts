'use strict';

describe('Table Badge Drives Filter', function () {
  beforeEach(angular.mock.module('aiqUi'));

  it('should return all types of data', inject(function ($filter) {

    expect($filter('drivesTableBadge')(null)).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')(undefined)).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')('')).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')(true)).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')(false)).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')('1000')).toEqual('<div class="table-badge -empty">-</div>');

    expect($filter('drivesTableBadge')(9, 'wear')).toEqual('<div class="table-badge -critical">9</div>');
    expect($filter('drivesTableBadge')(30, 'wear')).toEqual('<div class="table-badge -warning">30</div>');
    expect($filter('drivesTableBadge')(90, 'wear')).toEqual('<div class="table-badge -normal">90</div>');

    expect($filter('drivesTableBadge')(0, 'reserve')).toEqual('<div class="table-badge -critical">0</div>');
    expect($filter('drivesTableBadge')(10, 'reserve')).toEqual('<div class="table-badge -warning">10</div>');
    expect($filter('drivesTableBadge')(90, 'reserve')).toEqual('<div class="table-badge -normal">90</div>');
  }));

});