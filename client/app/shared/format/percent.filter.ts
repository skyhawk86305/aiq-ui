export function PercentFilter() {
  return function (data, decimalPlaces, useSuffix, useFactor, isComputed, forHtml, numberCap) {
    if (typeof data === 'number' || typeof data === 'string') {
      let number = typeof data === 'number' ? data : parseFloat(data),
        places = typeof decimalPlaces === 'number' ? decimalPlaces : 0,
        suffix = useSuffix ? (useFactor ? 'x' : '%') : '',
        prefix = '';

      if (isComputed) { number /= 100; }
      if (!useFactor) { number *= 100; }
      if (numberCap && number > numberCap) {
        number = numberCap;
        prefix = '>';
        places = 0;
      }
      if (forHtml) {
        suffix = '<span class="units">' + suffix + '</span>';
        prefix = '<span class="prefixSymbol">' + prefix + '</span>';
      }
      return number || number === 0 ? prefix + +(number).toFixed(places) + suffix : '-';
    } else { return '-'; }
  };
}
