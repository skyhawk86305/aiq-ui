import * as _ from 'lodash';
import { PermissionError } from './app.permissions';

export class AppController {
  public showNavbar = false;
  public host: string;
  public currentPage: string;
  public messageText: string;
  public messageType: string;
  public messageDate: string;
  public displayBanner: boolean;

  static $inject = ['$rootScope', 'ApiLogService', '$location', '$interval', '$http'];
  constructor(private $rootScope, private apiLogService, private $location, private $interval, private $http) {
    this.host = $location.host();
    this.messageText = '';
    this.messageType = 'info';
    this.messageDate = '';
    this.displayBanner = false;

    $rootScope.$on('$routeChangeSuccess', () => {
      this.showNavbar = $location.path() !== '/login' && $location.path() !== '/resetPassword';
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

  $onInit() {
    this.$interval( () => this.updateBanner(), 5 * 60 * 1000 );
    return this.updateBanner();
  }

  private updateBanner() {
    return this.$http
      .get('/banner-message', {
        cache: false,
        headers: { 'Cache-Control': 'no-cache' }
      })
      .then( ({ data }) => {
        const messageIsValid = (
          _(data).has('message') &&
          _(data).has('type') &&
          _(data).has('timestamp')
        );
        const messageIsNew = data.timestamp !== this.messageDate;

        if ( messageIsValid && messageIsNew ) {
          this.messageText = data.message;
          this.messageType = data.type;
          this.messageDate = data.timestamp;
          this.displayBanner = true;
        }
      })
      .catch( err => {
        // do nothing if the banner message request fails
      });
  }

  private dismissBanner() {
    this.displayBanner = false;
  }
}

