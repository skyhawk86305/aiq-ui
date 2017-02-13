(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('ipsUsed', function() {
      return function (addressBlocks) {
        if (Array.isArray(addressBlocks)) {
          let total = 0, used = 0;
          addressBlocks.forEach(function (addressBlock) {
            total += addressBlock.size;
            used += (addressBlock.available.match(/0/g) || []).length;
          });
          return used + '/' + total;
        } else {
          return '-';
        }
      };
    });
})();
