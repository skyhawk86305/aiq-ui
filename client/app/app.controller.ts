import { PermissionError } from './app.permissions';

export class AppController {
  public showNavbar = false;
  public host: string;
  public currentPage: string;

  static $inject = ['$rootScope', 'ApiLogService', '$location'];
  constructor(private $rootScope, private apiLogService, private $location) {
    this.host = $location.host();

    $rootScope.$on('$routeChangeSuccess', () => {
      this.showNavbar = $location.path() !== '/login' && $location.path() !== '/reset-password';
      this.currentPage = $location.path().slice(1).replace(/cluster\/([0-9]*)/, 'cluster').split('/').join('-');
    });

    $rootScope.$on('$routeChangeError', (evt, toRoute, fromRoute, error) => {
      // permission errors are already handled by route config
      if ( error instanceof PermissionError ) return;

      const oldUrl = $location.url();
      this.showNavbar = false;
      $location.path('/login').search({url: oldUrl});
    });
  }
}

