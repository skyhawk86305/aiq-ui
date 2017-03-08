export function DriveSlotFilter($filter) {
  return function (data) {
    if (typeof data !== 'number' && typeof data !== 'string') {
      return '-';
    }

    const number = typeof data === 'number' ? data : parseInt(data, 10);
    const validNumber = number || number === 0;

    if (data === -1) {
      return 'internal';
    }

    if (validNumber) {
      return $filter('number')(number);
    }

    return '-';
  };
}

DriveSlotFilter.$inject = ['$filter'];
