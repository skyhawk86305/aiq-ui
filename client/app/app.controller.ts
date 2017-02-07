export function AppController($rootScope, ApiLogService, $location) {
  let self = this;
  self.apiLogService = ApiLogService;
  self.showNavbar = false;
  self.host = $location.host();

  $rootScope.$on('$routeChangeSuccess', function() {
    self.showNavbar = $location.path() !== '/login';
    self.currentPage = $location.path().slice(1).replace(/cluster\/([0-9]*)/, 'cluster').split('/').join('-');
  });

  $rootScope.$on('$routeChangeError', function() {
    let oldUrl = $location.url();
    self.showNavbar = false;
    $location.path('/login').search({url: oldUrl});
  });
}

AppController.$inject = ['$rootScope', 'ApiLogService', '$location'];
