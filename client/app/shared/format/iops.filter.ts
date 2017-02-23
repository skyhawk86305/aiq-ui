export function IopsFilter() {
  return function (data, useK, decimalPlaces, displayIops, forHtml) {
    if (typeof data === 'number' || typeof data === 'string') {
      let number = typeof data === 'number' ? data : parseInt(data, 10),
        places = typeof decimalPlaces === 'number' ? decimalPlaces : 0,
        absNumber = Math.abs(number),
        isGreaterThan1000 = absNumber >= 1000,
        validNumber = !!(number || number === 0),
        iops = useK && isGreaterThan1000 ? number / 1000 : number,
        units = useK && isGreaterThan1000 ? 'k' : '';

      if (displayIops) { units += ' IOPS'; }
      if (forHtml) { units = '<span class="units">' + units + '</span>'; }
      return validNumber ? iops.toFixed(places) + units : '-';
    } else { return '-'; }
  };
}
