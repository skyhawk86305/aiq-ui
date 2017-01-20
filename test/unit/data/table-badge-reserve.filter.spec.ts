'use strict';

describe('Table Badge Drives Filter', function () {
  beforeEach(angular.mock.module('aiqUi'));

  it('should return all types of data', inject(function ($filter) {

    expect($filter('tableBadgeDrives')(null)).toEqual('<div class="table-badge -empty">-</div>');

    expect($filter('tableBadgeDrives')(true)).toEqual('<div class="table-badge -normal">true</div>');
    expect($filter('tableBadgeDrives')(false)).toEqual('<div class="table-badge -critical">false</div>');

    expect($filter('tableBadgeDrives')(9, 'wear')).toEqual('<div class="table-badge -critical">9</div>');
    expect($filter('tableBadgeDrives')(30, 'wear')).toEqual('<div class="table-badge -warning">30</div>');
    expect($filter('tableBadgeDrives')(90, 'wear')).toEqual('<div class="table-badge -normal">90</div>');

    expect($filter('tableBadgeDrives')(0, 'reserve')).toEqual('<div class="table-badge -critical">0</div>');
    expect($filter('tableBadgeDrives')(10, 'reserve')).toEqual('<div class="table-badge -warning">10</div>');
    expect($filter('tableBadgeDrives')(90, 'reserve')).toEqual('<div class="table-badge -normal">90</div>');

    expect($filter('tableBadgeDrives')('1000')).toEqual('<div class="table-badge -normal">1000</div>');
  }));

});