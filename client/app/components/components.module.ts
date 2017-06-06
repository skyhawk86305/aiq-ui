import * as angular from 'angular';
import 'jspolyfill-array.prototype.findIndex';

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
import { DashbergIOPService } from './admin/dashberg/dashberg-iop.service';
import { DashbergBandwidthService } from './admin/dashberg/dashberg-bandwidth.service';
import { DashbergNodeService } from './admin/dashberg/dashberg-node.service';
import { DashbergSessionService } from './admin/dashberg/dashberg-session.service';
import { DashbergSnapshotService } from './admin/dashberg/dashberg-snapshot.service';
import { DashbergVolumeAccessService } from './admin/dashberg/dashberg-volume-access.service';
import { DashbergVolumeSizeService } from './admin/dashberg/dashberg-volume-size.service';
import { DashbergVolumeService } from './admin/dashberg/dashberg-volume.service';

export const ComponentsModule = angular
  .module('aiqUi.components', [])
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
  .service('DashbergIOPService', DashbergIOPService)
  .service('DashbergBandwidthService', DashbergBandwidthService)
  .service('DashbergNodeService', DashbergNodeService)
  .service('DashbergSessionService', DashbergSessionService)
  .service('DashbergSnapshotService', DashbergSnapshotService)
  .service('DashbergVolumeAccessService', DashbergVolumeAccessService)
  .service('DashbergVolumeSizeService', DashbergVolumeSizeService)
  .service('DashbergVolumeService', DashbergVolumeService)

  .name;

// ToDo: import modules, components, filters and services similar to SharedModule
