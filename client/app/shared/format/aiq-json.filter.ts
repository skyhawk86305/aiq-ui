export function AiqJsonFilter($filter) {
  return function (data) {
    if (data === '""' || !data) {
      return '-';
    } else {
      return $filter('json')(data);
    }
  };
}

AiqJsonFilter.$inject = ['$filter'];
