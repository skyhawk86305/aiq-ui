import * as angular from 'angular';
import 'jspolyfill-array.prototype.findIndex';

import { ClusterSelectComponent } from './cluster-select/cluster-select.component';
import { ClusterSelectFilter } from './cluster-select/cluster-select.filter';
import { ClusterSelectService } from './cluster-select/cluster-select.service';
import { ClusterSelectInputFocus } from './cluster-select/input-focus.directive';

import { DashboardOverviewComponent } from './dashboard/overview/overview.component';
import { ClusterService } from './dashboard/overview/cluster.service';
import { TimestampWithWarningFilter } from './dashboard/overview/timestamp-with-warning.filter';

import { RegisterClusterComponent } from './dashboard/register-cluster/register-cluster.component';
import { RegisterClusterConfirmationComponent } from './dashboard/register-cluster/register-cluster-confirmation.component';

import { SupportDashboardOverviewComponent } from './support-dashboard/overview/overview.component';

import { UnregisteredClustersComponent } from './admin/unregistered-clusters/unregistered-clusters.component';
import { UnregisteredClustersService } from './admin/unregistered-clusters/unregistered-clusters.service';
import { RegisterUnregisteredClusterComponent } from './admin/unregistered-clusters/register-cluster.component';
import { RegisterUnregisteredClusterConfirmationComponent } from './admin/unregistered-clusters/register-cluster-confirmation.component';

import { RestoreClustersComponent } from './admin/archived-clusters/restore-clusters/restore-clusters.component';

import { ArchivedClustersComponent } from './admin/archived-clusters/archived-clusters.component';
import { ArchivedClustersService } from './admin/archived-clusters/archived-clusters.service';

import { FindClusterComponent } from './find-cluster/find-cluster.component';

import { VmwareAlarmsComponent } from './cluster/vmware-alarms/vmware-alarms.component';
import { VmwareAlarmsService } from './cluster/vmware-alarms/vmware-alarms.service';

import { DashbergComponent } from './admin/dashberg/dashberg.component';
import { DashbergService } from './admin/dashberg/dashberg.service';

import { LoginComponent } from './login/login.component';
import { AiqLoginComponent } from './login/aiq-login/aiq-login.component';
import { SSOPushComponent } from './login/sso-push/sso-push.component';
import { LinkSSOComponent } from './login/link-sso/link-sso.component';
import { LinkSSOResultComponent } from './login/link-sso/link-sso-result.component';

import { CustomComparatorsService } from '../shared/comparators/custom-comparators.service';

import { EfficiencyGraphsComponent } from './cluster/reporting/efficiency/efficiency.component';
import { CapacityGraphsComponent } from './cluster/reporting/capacity/capacity.component';
import { PerformanceGraphsComponent } from './cluster/reporting/performance/performance.component';
import { IscsiGraphsComponent } from './cluster/reporting/iscsi-sessions/iscsi-sessions.component';

import { SuppressClusterComponent } from './dashboard/alerts/suppressed-clusters/suppress-cluster/suppress-cluster.component';
import { SuppressedClustersComponent } from './dashboard/alerts/suppressed-clusters/suppressed-clusters.component';
import { ResumeNotificationsComponent } from './dashboard/alerts/suppressed-clusters/resume-notifications/resume-notifications.component';

import { UsedCapacityFilter } from './cluster/volumes/used-capacity-filter';

export const ComponentsModule = angular
  .module('aiqUi.components', [])

  .component('clusterSelect', ClusterSelectComponent)
  .service('ClusterSelectService', ClusterSelectService)
  .filter('clusterSelect', ClusterSelectFilter)
  .directive('clusterSelectInputFocus', ClusterSelectInputFocus)

  .component('dashboardOverview', DashboardOverviewComponent)
  .service('ClusterService', ClusterService)
  .filter('timestampWithWarning', TimestampWithWarningFilter)

  .component('registerCluster', RegisterClusterComponent)
  .component('registerClusterConfirmation', RegisterClusterConfirmationComponent)

  .component('supportOverview', SupportDashboardOverviewComponent)

  .component('unregisteredClusters', UnregisteredClustersComponent)
  .component('registerUnregisteredCluster', RegisterUnregisteredClusterComponent)
  .component('registerUnregisteredClusterConfirmation', RegisterUnregisteredClusterConfirmationComponent)
  .service('UnregisteredClustersService', UnregisteredClustersService)

  .component('archivedClusters', ArchivedClustersComponent)
  .service('ArchivedClustersService', ArchivedClustersService)

  .component('restoreClusters', RestoreClustersComponent)

  .component('findCluster', FindClusterComponent)

  .component('vmwareAlarms', VmwareAlarmsComponent)
  .service('VmwareAlarmsService', VmwareAlarmsService)

  .component('dashberg', DashbergComponent)
  .service('DashbergService', DashbergService)

  .component('efficiencyGraphs', EfficiencyGraphsComponent)
  .component('capacityGraphs', CapacityGraphsComponent)
  .component('performanceGraphs', PerformanceGraphsComponent)
  .component('iscsiSessions', IscsiGraphsComponent)

  .component('login', LoginComponent)
  .component('aiqLogin', AiqLoginComponent)
  .component('ssoPush', SSOPushComponent)
  .component('linkSSO', LinkSSOComponent)
  .component('linkSSOResult', LinkSSOResultComponent)

  .component('suppressedClusters', SuppressedClustersComponent)
  .component('suppressCluster', SuppressClusterComponent)
  .component('resumeNotifications', ResumeNotificationsComponent)

  .service('CustomComparatorsService', CustomComparatorsService)

  .filter('usedCapacity', UsedCapacityFilter)
  .name;

// ToDo: import modules, components, filters and services similar to SharedModule
