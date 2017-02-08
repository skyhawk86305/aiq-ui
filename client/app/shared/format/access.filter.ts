export function AccessFilter($filter) {
  return function (data) {
    switch (data) {
      case 'readWrite':
        return 'Read / Write';
      case 'readOnly':
        return 'Read Only';
      case 'locked':
        return 'Locked';
      case 'replicationTarget':
        return 'Replication Target';
      default:
        return $filter('string')(data);
    }
  };
}

AccessFilter.$inject = ['$filter'];
