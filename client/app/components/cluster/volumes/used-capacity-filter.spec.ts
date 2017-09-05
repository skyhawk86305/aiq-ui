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

  describe('for used capacity less than 80 percent', function() {
    it('should return a normal badge', inject(function($filter) {
      const result = filter(79);
      expect(result).toEqual('<div class="table-badge -normal">79%</div>');
    }));
  });

  describe('for used capacity between 80 and 95 percent', function() {
    it('should return a warning badge', inject(function($filter) {
      const result = filter(90);
      expect(result).toEqual('<div class="table-badge -warning">90%</div>');
    }));
  });

  describe('for used capacity over 95 percent', function() {
    it('should return a critical badge', inject(function($filter) {
      const result = filter(96);
      expect(result).toEqual('<div class="table-badge -critical">96%</div>');
    }));
  });

});
