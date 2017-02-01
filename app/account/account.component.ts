(function () {
  'use strict';

  angular
    .module('aiqUi')
    .component('account', {
      templateUrl: 'account/account.tpl.html',
      controller: ['UserInfoService', AccountController]
    });

  function AccountController(UserInfoService) {
    this.userInfo = UserInfoService;
  }
})();
