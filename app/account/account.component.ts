(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('account', {
      template: require('./account.tpl.html'),
      controller: ['UserInfoService', AccountController]
    });

  function AccountController(UserInfoService) {
    this.userInfo = UserInfoService;
  }
})();
