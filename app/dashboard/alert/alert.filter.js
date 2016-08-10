(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('alert', [alertFilter]);

  function alertFilter() {
    return function (data, params) {
      var type = params && params.type || '';
      switch (type) {
        case 'condition':
          var conditions = '';
          if (Array.isArray(data)) {
            data.forEach(function(field) {
              conditions += (conditions === '' ? '' : '<br>') + field.streamFieldDisplayName;
              if (field.notificationFieldOperator === '*') {
                conditions += ' is any value';
              } else {
                conditions += ' ' + field.notificationFieldOperator + ' ' + field.notificationFieldValue;
              }
            });
          } else {
            conditions = data;
          }

          return conditions;

        default:
          return data;
      }
    };
  }
})();
