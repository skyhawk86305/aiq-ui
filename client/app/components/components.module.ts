import * as angular from 'angular';
import 'jspolyfill-array.prototype.findIndex';

import { DashboardOverviewComponent } from './dashboard/overview/overview.component';
import { ClusterService } from './dashboard/overview/cluster.service';
import { TimestampWithWarningFilter } from './dashboard/overview/timestamp-with-warning.filter';

import { RegisterClusterComponent } from './dashboard/register-cluster/register-cluster.component';
import { RegisterClusterConfirmationComponent } from './dashboard/register-cluster/register-cluster-confirmation.component';

import { UnregisteredClustersComponent } from './admin/unregistered-clusters/unregistered-clusters.component';
import { UnregisteredClustersService } from './admin/unregistered-clusters/unregistered-clusters.service';
import { RegisterUnregisteredClusterComponent } from './admin/unregistered-clusters/register-cluster.component';
import { RegisterUnregisteredClusterConfirmationComponent } from './admin/unregistered-clusters/register-cluster-confirmation.component';

import { FindClusterComponent } from './find-cluster/find-cluster.component';

import { VmwareAlarmsComponent } from './cluster/vmware-alarms/vmware-alarms.component';
import { VmwareAlarmsService } from './cluster/vmware-alarms/vmware-alarms.service';

import { DashbergComponent } from './admin/dashberg/dashberg.component';
import { DashbergService } from './admin/dashberg/dashberg.service';

export const ComponentsModule = angular
  .module('aiqUi.components', [])
  .component('dashboardOverview', DashboardOverviewComponent)
  .service('ClusterService', ClusterService)
  .filter('timestampWithWarning', TimestampWithWarningFilter)

  .component('registerCluster', RegisterClusterComponent)
  .component('registerClusterConfirmation', RegisterClusterConfirmationComponent)

  .component('unregisteredClusters', UnregisteredClustersComponent)
  .component('registerUnregisteredCluster', RegisterUnregisteredClusterComponent)
  .component('registerUnregisteredClusterConfirmation', RegisterUnregisteredClusterConfirmationComponent)
  .service('UnregisteredClustersService', UnregisteredClustersService)

  .component('findCluster', FindClusterComponent)

  .component('vmwareAlarms', VmwareAlarmsComponent)
  .service('VmwareAlarmsService', VmwareAlarmsService)

  .component('dashberg', DashbergComponent)
  .service('DashbergService', DashbergService)

  .name;

// ToDo: import modules, components, filters and services similar to SharedModule
