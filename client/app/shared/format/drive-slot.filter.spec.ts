describe('DriveSlotFilter', function() {
  let filter;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach( inject(function($filter) {
    filter = $filter('driveSlot');
  }));

  describe('with a valid number', function() {
    it('should convert the number to the expected string', function() {
      expect(filter(5)).toBe('5');
      expect(filter(5000)).toBe('5,000');
    });

    it('should convert a string number to the expected string', function() {
      expect(filter('5')).toBe('5');
      expect(filter('5000')).toBe('5,000');
    });

    it('should convert -1 to the string "internal"', function() {
      expect(filter(-1)).toBe('internal');
    });

    it('should convert invalid values to "-"', function() {
      expect(filter(null)).toBe('-');
      expect(filter(undefined)).toBe('-');
      expect(filter({})).toBe('-');
      expect(filter('test')).toBe('-');
    });
  });

});
