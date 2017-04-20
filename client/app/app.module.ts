import * as angular from 'angular';
import 'angular-cache';
import 'angular-filter';
import 'angular-route';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import 'angular-permission';
import * as objectAssignPolyfill from 'es6-object-assign';
import '../../node_modules/@sf-netapp/sf-components/dist/sf-components.js';

import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { AppRoutes } from './app.routes';
import { AppPermissions } from './app.permissions';
import './styles';
import './images';

objectAssignPolyfill.polyfill();

export const AppModule = angular
  .module('aiqUi', [
    'ui.bootstrap',
    'ngRoute',
    'ngSanitize',
    'angular-cache',
    'permission',
    'permission.ng',
    'angular.filter',
    'sfComponents',
    ComponentsModule,
    SharedModule
  ])
  .controller('AppController', AppController)
  .config(AppRoutes)
  .run(AppPermissions)
  .name;

// ToDo: Remove this once components are modularized
let scripts = require.context('./components', true, /(?!\.spec)[\w-]{5}\.ts$/);
scripts.keys().forEach(scripts);

let styles = require.context('./components', true, /\.less$/);
styles.keys().forEach(styles);
 
