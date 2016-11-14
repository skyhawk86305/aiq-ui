(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('bytes', function() {
      return function (bytes, binary, decimalPlaces, space) {
        var thresh = binary ? 1024 : 1000,
          binaryUnits = ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'],
          decimalUnits = ['KB','MB','GB','TB','PB','EB','ZB','YB'],
          units = binary ? binaryUnits : decimalUnits,
          u = -1, formatted;

        if (!bytes) { return '0 B'; }
        if (bytes < thresh) {
          return (decimalPlaces || decimalPlaces === 0) ? bytes.toFixed(decimalPlaces) + ' B' : bytes.toFixed(1) + ' B';
        }

        do {
          bytes /= thresh;
          ++u;
        } while (bytes >= thresh);

        formatted = bytes.toFixed(decimalPlaces) + ' ' + units[u];
        if (space === false) { formatted = formatted.replace(/\s+/gi, ''); }

        return formatted;
      };
    });
})();
