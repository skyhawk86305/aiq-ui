(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ApiLogService', [
      'SFApiLogService',
      ApiLogService
    ]);

  function ApiLogService(SFApiLogService) {
    var categories = {
      all: {
        label: 'All Calls',
        limit: 25,
        display: 10
      }
    };

    var categorize = function(request) {
      switch(request.method) {
        default: return 'all';
      }
    };

    return new SFApiLogService(categories, categorize);
  }
})();
