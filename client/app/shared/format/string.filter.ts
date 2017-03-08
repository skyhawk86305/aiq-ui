export function StringFilter() {
  return function (data, capitalize) {

    if (typeof data === 'number' || typeof data === 'string') {
      const string = typeof data === 'string' ? data : data.toString();
      if (capitalize && string.length > 0) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      return string;
    }

    if (typeof data === 'object' && data && data.length) {
      return data.join(', ');
    }

    return '-';
  };
}
