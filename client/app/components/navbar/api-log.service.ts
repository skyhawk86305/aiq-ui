(function () {
  'use strict';

  angular
    .module('aiqUi')
    .service('ApiLogService', [
      'SFApiLogService',
      ApiLogService
    ]);

  function ApiLogService(SFApiLogService) {
    let categories = {
      all: {
        label: 'All Calls',
        limit: 25,
        display: 10
      }
    };

    let categorize = function(request) {
      switch (request.method) {
        default: return 'all';
      }
    };

    return new SFApiLogService(categories, categorize);
  }
})();
