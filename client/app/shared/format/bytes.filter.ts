export function BytesFilter() {
  return function (data, binary, decimalPlaces, throughput, forHtml) {
    if (typeof data === 'number' || typeof data === 'string') {
      let number = typeof data === 'number' ? Math.floor(data) : parseInt(data, 10),
        places = typeof decimalPlaces === 'number' ? decimalPlaces : 0,
        absNumber = Math.abs(number),
        isNegative = number < 0,
        isZero = number === 0,
        validNumber = !!(number || isZero),
        binarySizes = ['B','KiB','MiB','GiB','TiB','PiB','EiB'],
        decimalSizes = ['B','KB','MB','GB','TB','PB','EB'],
        sizes = binary ? binarySizes : decimalSizes,
        base = binary ? 1024 : 1000,
        sizeIndex = validNumber && !isZero ? Math.floor(Math.log(absNumber) / Math.log(base)) : 0,
        bytes = validNumber && !isZero ? absNumber / Math.pow(base, sizeIndex) : 0,
        units = throughput ? sizes[sizeIndex] + '/s' : sizes[sizeIndex];

      if (forHtml) { units = '<span class="units">' + units + '</span>'; }
      if (isNegative) { bytes *= -1; }
      return validNumber ? +(bytes).toFixed(places) + units : '-';
    } else { return '-'; }
  };
}
