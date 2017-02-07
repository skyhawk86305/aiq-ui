export function DriveSlotFilter($filter) {
  return function (data) {
    if (typeof data === 'number' || typeof data === 'string') {
      let number = typeof data === 'number' ? data : parseInt(data, 10),
        validNumber = number || number === 0;

      if (data === -1) { return 'internal'; }
      else if (validNumber) { return $filter('number')(number); }
      else { return '-'; }
    } else { return '-'; }
  };
}

DriveSlotFilter.$inject = ['$filter'];
