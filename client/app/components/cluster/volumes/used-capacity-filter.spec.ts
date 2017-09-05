describe('Used Capacity Filter', function() {
  let filter;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($filter) {
    filter = $filter('usedCapacity');
  }))

  describe('for invalid data', function() {
    it('should return an empty badge with a dash', inject(function($filter) {
      const result = filter('asdf');
      expect(result).toEqual('<div class="table-badge -empty">-</div>');
    }));
  });

  describe('for used capacity less than 50 percent', function() {
    it('should return a normal badge', inject(function($filter) {
      const result = filter(49);
      expect(result).toEqual('<div class="table-badge -normal">49%</div>');
    }));
  });

  describe('for used capacity between 50 and 75 percent', function() {
    it('should return a warning badge', inject(function($filter) {
      const result = filter(60);
      expect(result).toEqual('<div class="table-badge -warning">60%</div>');
    }));
  });

  describe('for used capacity over 75 percent', function() {
    it('should return a critical badge', inject(function($filter) {
      const result = filter(76);
      expect(result).toEqual('<div class="table-badge -critical">76%</div>');
    }));
  });

});
