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

  static $inject = [
    '$rootScope',
    'ApiLogService',
    '$location',
    '$interval',
    '$http',
    'AuthService',
    '$uibModal',
  ];
  constructor(
    private $rootScope,
    private apiLogService,
    private $location,
    private $interval,
    private $http,
    private AuthService,
    private $uibModal,
  ) {
    this.host = $location.host();
    this.messageText = '';
    this.messageType = 'info';
    this.messageDate = '';
    this.displayBanner = false;

    $rootScope.$on('$routeChangeSuccess', () => {
      this.showNavbar = $location.path() !== '/login' && $location.path() !== '/aiq-login' && $location.path() !== '/sso-login' && $location.path() !== '/reset-password';
      this.currentPage = $location.path().slice(1).replace(/cluster\/([0-9]*)/, 'cluster').split('/').join('-');
    });

    $rootScope.$on('$routeChangeError', (evt, toRoute, fromRoute, error) => {
      // permission errors are already handled by route config
      if ( error instanceof PermissionError ) return;

      // if user is missing an AIQ session, it might be because they signed in with SSO but haven't yet linked their account
      if ( _.get(error, 'status') === 404 ) {
        this.AuthService.getSSOSession()
          .then( () => {
            this.promptUserToLinkSSO();
          })
          .catch( err => {
            // they don't have an SSO session either, so send them to the login page
            this.showLoginPage();
          });
        return;
      }

      this.showLoginPage();
    });
  }

  private promptUserToLinkSSO() {
    return this.$uibModal
      .open({
        animation: false,
        component: 'linkSSO',
        size: 'md',
        windowClass: 'aiq-modal link-sso-modal',
        backdrop: 'static',
        backdropClass: 'link-sso-modal-backdrop',
      })
      .result;
  }

  private showLoginPage() {
    const oldUrl = this.$location.url();
    this.showNavbar = false;
    this.$location.path('/login').search({url: oldUrl});
  }

  $onInit() {
    if ( this.$location.search().linkSSO === true ) {
      console.log('Call linkSSO API');
    }
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

