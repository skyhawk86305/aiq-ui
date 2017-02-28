(function () {
  'use strict';

  const _ = require('lodash');

  const moduleName = 'aiqUi';
  const componentName = 'addAlertPolicy';
  const template = require('./add-policy.tpl.html');
  const deps = ['UserInfoService', 'DataService', '$location'];

  class AddAlertPolicyController {

    // alert policy fields
    public policyType: string;
    public name: string;
    public severity: string;
    public emails: string;
    public clusterID = null;
    public customerID = null;
    public clusterFaultType: string = null;
    public eventType: string;
    public clusterUtilizationThreshold: number;
    public usableSpaceThreshold: number;
    public provisionableSpaceThreshold: number;
    public collectorNotReportingTime: number;
    public driveWearThreshold: number;
    public driveWearType: string;
    public sessionsThreshold: number;
    public capacityLicensingThreshold: number;

    // option lists
    public policyTypes;
    public severities;
    public clusters;
    public customers;
    public clusterFaultTypes;
    public eventTypes;
    public driveWearTypes;

    // form state
    public form;
    public successful = false;
    public error = null;

    constructor(private UserInfoService, private DataService, private $location) {
      this.policyTypes = this.getPolicyTypes();
      this.severities = this.getSeverities();
      this.clusterFaultTypes = this.getClusterFaultTypes();
      this.eventTypes = this.getEventTypes();
      this.driveWearTypes = this.getDriveWearTypes();

      this.initFieldValues();

      this.UserInfoService.getUserInfo().then( userInfo => {
        this.emails = this.UserInfoService.currentUser.username;
      });

      this.getClustersAndCustomers();
    }

    getClustersAndCustomers() {
      return this.DataService
        .callAPI('ListActiveClusters', {
          components: ['clusterVersionInfo', 'clusterInfo' ]
        })
        .then( response => _.get(response, 'clusters', []) )
        .then( clusters => {
          this.clusters = clusters.map( c => ({
            id: c.clusterID,
            name: `${c.customerName} - ${c.clusterName || 'Unnamed Cluster'}`,
          }));

          this.customers = _(clusters)
            .map( c => ({
              id: c.customerID,
              name: c.customerName,
            }))
            .uniqBy('id')
            .value();
        });
    }

    initFieldValues() {
      this.policyType = this.policyTypes[0][0];
      this.name = '';
      this.severity = this.severities[0];
      this.clusterID = null;
      this.customerID = null;
      this.clusterFaultType = null;
      this.eventType = this.eventTypes[0];
      this.clusterUtilizationThreshold = null;
      this.usableSpaceThreshold = null;
      this.provisionableSpaceThreshold = null;
      this.collectorNotReportingTime = null;
      this.driveWearThreshold = null;
      this.driveWearType = this.driveWearTypes[0][0];
      this.sessionsThreshold = null;
      this.capacityLicensingThreshold = null;
    }

    submit() {
      this.DataService
        .callAPI('AddNotification', {
          notificationName: this.name,
          notificationSeverity: this.severity,
          notificationFields: [ this.getNotificationFields() ],
          destinationEmail: this.emails,
          clusterID: (this.policyType !== 'licensing') ? this.clusterID : null,
          customerID: (this.policyType === 'licensing') ? this.customerID : null,
        })
        .then( res => {
          this.successful = true;
          this.initFieldValues();
          this.form.$setUntouched();
          this.form.$setPristine();
        })
        .catch( err => {
          if (err.message) this.error = err.message;
          else if (err.data) this.error = err.data;
          else this.error = err;
        });
    }

    cancel() {
      this.$location.path('/dashboard/alerts/policies');
    }

    getNotificationFields() {
      switch (this.policyType) {
        case 'clusterFault': return {
          streamName: 'ListClusterFaults',
          streamFieldName: 'code',
          notificationFieldOperator: (this.clusterFaultType ? '=' : '*'),
          notificationFieldValue: this.clusterFaultType,
        };

        case 'event': return {
          streamName: 'ListEvents',
          streamFieldName: 'eventInfoType',
          notificationFieldOperator: '=',
          notificationFieldValue: this.eventType,
        };

        case 'failedDrive': return {
          streamName: 'ListDrives',
          streamFieldName: 'status',
          notificationFieldOperator: '=',
          notificationFieldValue: 'failed',
        };

        case 'availableDrive': return {
          streamName: 'ListDrives',
          streamFieldName: 'status',
          notificationFieldOperator: '=',
          notificationFieldValue: 'available',
        };

        case 'utilization': return {
          streamName: 'GetClusterStats',
          streamFieldName: 'clusterUtilization',
          notificationFieldOperator: '>',
          notificationFieldValue: this.clusterUtilizationThreshold,
        };

        case 'usedSpace': return {
          streamName: 'GetClusterCapacity',
          streamFieldName: 'unUsedSpacePercent',
          notificationFieldOperator: '<',
          notificationFieldValue: this.usableSpaceThreshold,
        };

        case 'provisionedSpace': return {
          streamName: 'GetClusterCapacity',
          streamFieldName: 'unProvisionedSpacePercent',
          notificationFieldOperator: '<',
          notificationFieldValue: this.provisionableSpaceThreshold,
        };

        case 'collectorNotReporting': return {
          streamName: 'CollectorNotReporting',
          streamFieldName: 'downTime',
          notificationFieldOperator: '>',
          notificationFieldValue: this.collectorNotReportingTime,
        };

        case 'driveWear': return {
          streamName: 'GetDriveStats',
          streamFieldName: this.driveWearType,
          notificationFieldOperator: '<',
          notificationFieldValue: this.driveWearThreshold,
        };

        case 'sessions': return {
          streamName: 'GetClusterCapacity',
          streamFieldName: 'activeSessions',
          notificationFieldOperator: '>',
          notificationFieldValue: this.sessionsThreshold,
        };

        case 'licensing': return {
          streamName: 'EntitledLicenseCapacity',
          streamFieldName: 'provisionedSpace',
          notificationFieldOperator: '>',
          notificationFieldValue: this.capacityLicensingThreshold,
        };
      }
    }

    getPolicyTypes() {
      return [
        ['clusterFault', 'Cluster Fault'],
        ['event', 'Event'],
        ['failedDrive', 'Failed Drive'],
        ['availableDrive', 'Available Drive'],
        ['utilization', 'Cluster Utilization'],
        ['usedSpace', 'Usable Space'],
        ['provisionedSpace', 'Provisionable Space'],
        ['collectorNotReporting', 'Collector Not Reporting'],
        ['driveWear', 'Drive Wear'],
        ['sessions', 'iSCSI Sessions'],
        ['licensing', 'Capacity Licensing']
      ];
    }

    getSeverities() {
      return [ 'Info', 'Warning', 'Error', 'Critical' ];
    }

    getClusterFaultTypes() {
      return [
        'blockServiceTooFull',
        'blockServiceUnhealthy',
        'clusterCannotSync',
        'clusterFull',
        'clusterIOPSAreOverProvisioned',
        'ensembleDegraded',
        'exception',
        'failedSpaceTooFull',
        'nodeHardwareFault',
        'provisionedSpaceTooFull',
        'sliceServiceTooFull',
        'sliceServiceUnhealthy',
        'volumesDegraded'
      ];
    }

    getEventTypes() {
      return [
        'apiEvent',
        'binAssignmentsEvent',
        'bsCheckEvent',
        'cloneEvent',
        'clusterMasterEvent',
        'dataEvent',
        'dbEvent',
        'diskEvent',
        'ensembleEvent',
        'gcEvent',
        'serviceEvent',
        'sliceEvent',
        'unexpectedException'
      ];
    }

    getDriveWearTypes() {
      return [
        ['lifeRemainingPercent', 'Wear'],
        ['reserveCapacityPercent', 'Reserve'],
      ];
    }
  }

  angular
    .module(moduleName)
    .component(componentName, {
      template,
      controller: [...deps, AddAlertPolicyController],
    });

})();
