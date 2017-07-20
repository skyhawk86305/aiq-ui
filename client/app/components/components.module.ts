import * as angular from 'angular';
import 'jspolyfill-array.prototype.findIndex';

import { ClusterSelectComponent } from './cluster-select/cluster-select.component';
import { ClusterSelectFilter } from './cluster-select/cluster-select.filter';
import { ClusterSelectService } from './cluster-select/cluster-select.service';

import { DashboardOverviewComponent } from './dashboard/overview/overview.component';
import { ClusterService } from './dashboard/overview/cluster.service';
import { TimestampWithWarningFilter } from './dashboard/overview/timestamp-with-warning.filter';

import { RegisterClusterComponent } from './dashboard/register-cluster/register-cluster.component';
import { RegisterClusterConfirmationComponent } from './dashboard/register-cluster/register-cluster-confirmation.component';

import { UnregisteredClustersComponent } from './admin/unregistered-clusters/unregistered-clusters.component';
import { UnregisteredClustersService } from './admin/unregistered-clusters/unregistered-clusters.service';
import { RegisterUnregisteredClusterComponent } from './admin/unregistered-clusters/register-cluster.component';
import { RegisterUnregisteredClusterConfirmationComponent } from './admin/unregistered-clusters/register-cluster-confirmation.component';

import { ArchivedClustersComponent } from './admin/archived-clusters/archived-clusters.component';
import { ArchivedClustersService } from './admin/archived-clusters/archived-clusters.service';

import { FindClusterComponent } from './find-cluster/find-cluster.component';

import { VmwareAlarmsComponent } from './cluster/vmware-alarms/vmware-alarms.component';
import { VmwareAlarmsService } from './cluster/vmware-alarms/vmware-alarms.service';

import { DashbergComponent } from './admin/dashberg/dashberg.component';
import { DashbergService } from './admin/dashberg/dashberg.service';

import { CustomComparatorsService } from '../shared/comparators/custom-comparators.service';

export const ComponentsModule = angular
  .module('aiqUi.components', [])

  .component('clusterSelect', ClusterSelectComponent)
  .service('ClusterSelectService', ClusterSelectService)
  .filter('clusterSelect', ClusterSelectFilter)

  .component('dashboardOverview', DashboardOverviewComponent)
  .service('ClusterService', ClusterService)
  .filter('timestampWithWarning', TimestampWithWarningFilter)

  .component('registerCluster', RegisterClusterComponent)
  .component('registerClusterConfirmation', RegisterClusterConfirmationComponent)

  .component('unregisteredClusters', UnregisteredClustersComponent)
  .component('registerUnregisteredCluster', RegisterUnregisteredClusterComponent)
  .component('registerUnregisteredClusterConfirmation', RegisterUnregisteredClusterConfirmationComponent)
  .service('UnregisteredClustersService', UnregisteredClustersService)

  .component('archivedClusters', ArchivedClustersComponent)
  .service('ArchivedClustersService', ArchivedClustersService)

  .component('findCluster', FindClusterComponent)

  .component('vmwareAlarms', VmwareAlarmsComponent)
  .service('VmwareAlarmsService', VmwareAlarmsService)

  .component('dashberg', DashbergComponent)
  .service('DashbergService', DashbergService)

  .service('CustomComparatorsService', CustomComparatorsService)

  .name;

// ToDo: import modules, components, filters and services similar to SharedModule
