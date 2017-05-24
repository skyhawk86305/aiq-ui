import * as angular from 'angular';
import 'jspolyfill-array.prototype.findIndex';

import { RegisterClusterComponent } from './dashboard/register-cluster/register-cluster.component.ts';
import { RegisterClusterConfirmationComponent} from './dashboard/register-cluster/register-cluster-confirmation.component.ts';

export const ComponentsModule = angular
  .module('aiqUi.components', [])
  .component('registerCluster', RegisterClusterComponent)
  .component('registerClusterConfirmation', RegisterClusterConfirmationComponent)
  .name;

// ToDo: import modules, components, filters and services similar to SharedModule
