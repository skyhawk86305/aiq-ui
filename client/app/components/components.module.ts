import * as angular from 'angular';
import 'jspolyfill-array.prototype.findIndex';

import { RegisterClusterComponent } from './dashboard/register-cluster/register-cluster.component.ts';
import { RegisterClusterConfirmationComponent } from './dashboard/register-cluster/register-cluster-confirmation.component.ts';

import { UnregisteredClustersComponent } from './admin/unregistered-clusters/unregistered-clusters.component';
import { UnregisteredClustersService } from './admin/unregistered-clusters/unregistered-clusters.service';
import { RegisterUnregisteredClusterComponent } from './admin/unregistered-clusters/register-cluster.component';
import { RegisterUnregisteredClusterConfirmationComponent } from './admin/unregistered-clusters/register-cluster-confirmation.component';

export const ComponentsModule = angular
  .module('aiqUi.components', [])
  .component('registerCluster', RegisterClusterComponent)
  .component('registerClusterConfirmation', RegisterClusterConfirmationComponent)

  .component('unregisteredClusters', UnregisteredClustersComponent)
  .component('registerUnregisteredCluster', RegisterUnregisteredClusterComponent)
  .component('registerUnregisteredClusterConfirmation', RegisterUnregisteredClusterConfirmationComponent)
  .service('UnregisteredClustersService', UnregisteredClustersService)
  .name;

// ToDo: import modules, components, filters and services similar to SharedModule
