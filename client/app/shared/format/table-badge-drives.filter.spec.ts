'use strict';

describe('Table Badge Drives Filter', function () {
  beforeEach(angular.mock.module('aiqUi'));

  it('should return all types of data', inject(function ($filter) {
    expect($filter('drivesTableBadge')(null)).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')(undefined)).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')('')).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')(true)).toEqual('<div class="table-badge -empty">-</div>');
    expect($filter('drivesTableBadge')(false)).toEqual('<div class="table-badge -empty">-</div>');

    expect($filter('drivesTableBadge')(0, 'wear')).toEqual('<div class="table-badge -critical">0%</div>');
    expect($filter('drivesTableBadge')(9, 'wear')).toEqual('<div class="table-badge -critical">9%</div>');
    expect($filter('drivesTableBadge')(10, 'wear')).toEqual('<div class="table-badge -warning">10%</div>');
    expect($filter('drivesTableBadge')(11, 'wear')).toEqual('<div class="table-badge -warning">11%</div>');
    expect($filter('drivesTableBadge')(30, 'wear')).toEqual('<div class="table-badge -warning">30%</div>');
    expect($filter('drivesTableBadge')(79, 'wear')).toEqual('<div class="table-badge -warning">79%</div>');
    expect($filter('drivesTableBadge')(80, 'wear')).toEqual('<div class="table-badge -normal">80%</div>');
    expect($filter('drivesTableBadge')(90, 'wear')).toEqual('<div class="table-badge -normal">90%</div>');
    expect($filter('drivesTableBadge')(100, 'wear')).toEqual('<div class="table-badge -normal">100%</div>');

    expect($filter('drivesTableBadge')('1000', 'wear')).toEqual('<div class="table-badge -normal">1000%</div>');

    expect($filter('drivesTableBadge')(0, 'reserve')).toEqual('<div class="table-badge -critical">0%</div>');
    expect($filter('drivesTableBadge')(1, 'reserve')).toEqual('<div class="table-badge -warning">1%</div>');
    expect($filter('drivesTableBadge')(10, 'reserve')).toEqual('<div class="table-badge -warning">10%</div>');
    expect($filter('drivesTableBadge')(19, 'reserve')).toEqual('<div class="table-badge -warning">19%</div>');
    expect($filter('drivesTableBadge')(20, 'reserve')).toEqual('<div class="table-badge -normal">20%</div>');
    expect($filter('drivesTableBadge')(21, 'reserve')).toEqual('<div class="table-badge -normal">21%</div>');
    expect($filter('drivesTableBadge')(90, 'reserve')).toEqual('<div class="table-badge -normal">90%</div>');
    expect($filter('drivesTableBadge')(100, 'reserve')).toEqual('<div class="table-badge -normal">100%</div>');

    expect($filter('drivesTableBadge')('1000', 'reserve')).toEqual('<div class="table-badge -normal">1000%</div>');
  }));
});
