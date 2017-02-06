export function AiqDateFilter($filter) {
  return function (data, format) {
    return data ? $filter('date')(data, format) : '-';
  };
}

AiqDateFilter.$inject = ['$filter'];
