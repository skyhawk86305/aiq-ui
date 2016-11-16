(function () {
  'use strict';
  
  angular
    .module('aiqUi')
    .filter('bytes', function() {
      return function (data, binary, decimalPlaces, throughput, forHtml) {
        if(typeof data === 'number' || typeof data === 'string') {
          var number = typeof data === 'number' ? data : parseFloat(data),
            places = typeof decimalPlaces === 'number' ? decimalPlaces : 0,
            absNumber = Math.abs(number),
            validNumber = !!(number || number === 0),
            validBytes = validNumber && absNumber >= 1,
            isNegative = number < 0,
            binarySizes = ['B','KiB','MiB','GiB','TiB','PiB','EiB'],
            decimalSizes = ['B','KB','MB','GB','TB','PB','EB'],
            sizes = binary ? binarySizes : decimalSizes,
            base = binary ? 1024 : 1000,
            sizeIndex = validBytes ? Math.floor(Math.log(absNumber) / Math.log(base)) : 0,
            bytes = validBytes ? parseFloat((absNumber / Math.pow(base, sizeIndex))) : 0,
            units = throughput ? sizes[sizeIndex] + '/s' : sizes[sizeIndex];
          if(forHtml) { units = '<span class="units">' + units + '</span>'; }
          if(isNegative) { bytes *= -1; }
          return validNumber ? bytes.toFixed(places) + units : '-';
        } else { return '-'; }
      };
    });
})();