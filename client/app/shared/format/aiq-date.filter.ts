export function AiqDateFilter($filter) {
  return function (data, format = 'yyyy-MM-dd HH:mm:ss') {
    return data ? $filter('date')(data, format) : '-';
  };
}

AiqDateFilter.$inject = ['$filter'];
