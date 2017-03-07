import * as angular from 'angular';
import { FormatModule } from './format/format.module';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { UserInfoService } from './user-info.service';
import { GraphResolutionFilter } from './graph-resolution.filter';
import { ScrollToTopDirective } from './scroll-to-top.directive';

export const SharedModule = angular
  .module('aiqUi.shared', [
    FormatModule
  ])
  .service('AuthService', AuthService)
  .service('DataService', DataService)
  .service('UserInfoService', UserInfoService)
  .filter('graphResolution', GraphResolutionFilter)
  .directive('scrollToTop', ScrollToTopDirective)
  .name;
