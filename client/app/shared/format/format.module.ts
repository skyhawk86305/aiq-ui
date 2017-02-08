import * as angular from 'angular';
import { AccessFilter } from './access.filter';
import { AiqDateFilter } from './aiq-date.filter';
import { AiqJsonFilter } from './aiq-json.filter';
import { AiqNumberFilter } from './aiq-number.filter';
import { BooleanFilter } from './boolean.filter';
import { BytesFilter } from './bytes.filter';
import { ClusterStageFilter } from './cluster-stage.filter';
import { DriveSlotFilter } from './drive-slot.filter';
import { IopsFilter } from './iops.filter';
import { PercentFilter } from './percent.filter';
import { StringFilter } from './string.filter';
import { TableBadgeAlertSeverityFilter } from './table-badge-alert-severity.filter';
import { TableBadgeBooleanFilter } from './table-badge-boolean.filter';
import { TableBadgeDrivesFilter } from './table-badge-drives.filter';

export const FormatModule = angular
  .module('aiqUi.shared.format', [])
  .filter('access', AccessFilter)
  .filter('aiqDate', AiqDateFilter)
  .filter('aiqJson', AiqJsonFilter)
  .filter('aiqNumber', AiqNumberFilter)
  .filter('boolean', BooleanFilter)
  .filter('bytes', BytesFilter)
  .filter('clusterStage', ClusterStageFilter)
  .filter('driveSlot', DriveSlotFilter)
  .filter('iops', IopsFilter)
  .filter('percent', PercentFilter)
  .filter('string', StringFilter)
  .filter('tableBadgeAlertSeverity', TableBadgeAlertSeverityFilter)
  .filter('tableBadgeBoolean', TableBadgeBooleanFilter)
  .filter('drivesTableBadge', TableBadgeDrivesFilter)
  .name;