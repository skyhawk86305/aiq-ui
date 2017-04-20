(function () {
  'use strict';

  class VmwareAlarmsController {
    constructor() {}
  }

  angular
    .module('aiqUi')
    .component('vmwareAlarms', {
      template: require('./vmware-alarms.tpl.html'),
      controller: [ VmwareAlarmsController ],
    });
})();
