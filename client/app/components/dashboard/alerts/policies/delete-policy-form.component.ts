(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('deletePolicyForm', {
      template: require('./delete-policy-form.tpl.html'),
      require: {
        modal: '^sfModal'
      },
      bindings: {
        formData: '<?'
      },
      controller: ['$rootScope', '$timeout', 'DataService', function($rootScope, $timeout, DataService) {
        let ctrl = this;
        ctrl.deletePolicy = function() {
          let self = this;
          return DataService.callAPI('DeleteNotification', {notificationID: this.formData.notificationID}).then(() => {
            self.modal.close();
            $rootScope.$broadcast('refresh-alert-policy', true);
          }).catch(err => {
            ctrl.error = err;
          });
        };
      }]
    });
})();
