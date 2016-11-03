(function () {
  'use strict';

  angular
    .module('aiqUi')
    .filter('aiqClusterStage', ['$filter', aiqClusterStage]);

  function aiqClusterStage() {
    return function (stage) {
      var conversion = {
        'stage1': 'Normal',
        'stage2': 'Normal',
        'stage3': 'Warning',
        'stage4': 'Error',
        'stage5': 'Full'
      };

      return stage.substr && conversion[stage.substr(0, 'stageN'.length)] || 'n/a';
    };
  }
})();
