(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('driveSlot', function() {
      return function (slot) {
        if (slot && slot.toString() === '-1') {
          return 'internal';
        } else {
          return slot;
        }
      };
    });
})();
