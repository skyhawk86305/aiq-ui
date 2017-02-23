'use strict';

describe('Component: addAlertPolicy', function() {
  let DataService,
    controller,
    q;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $q) {
    q = $q;
    DataService = {
      callAPI() {
        return $q.resolve();
      }
    };
    controller = $componentController('addAlertPolicy', { DataService });
  }));


  describe('submit()', function() {
    it('should call the correct API on DataService', function() {
      controller.name = 'testPolicy';
      controller.severity = 'Info';
      controller.emails = 'testuser@email.com';
      controller.clusterID = 123;
      controller.customerID = null;
      controller.policyType = 'clusterFault';
      controller.clusterFaultType = null;

      spyOn(DataService, 'callAPI').and.callFake( () => {
        return q.resolve();
      });
      controller.submit();

      expect(DataService.callAPI).toHaveBeenCalledWith('AddNotification', {
        notificationName: 'testPolicy',
        notificationSeverity: 'Info',
        notificationFields: [{
          streamName: 'ListClusterFaults',
          streamFieldName: 'code',
          notificationFieldOperator: '*',
          notificationFieldValue: null,
        }],
        destinationEmail: 'testuser@email.com',
        clusterID: 123,
        customerID: null,
      });
    });
  });

  describe('getNotificationFields()', function() {
    describe('should correctly build the API request for', function() {

      it('any clusterFault', function() {
        controller.policyType = 'clusterFault';
        controller.clusterFaultType = null;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'ListClusterFaults',
          streamFieldName: 'code',
          notificationFieldOperator: '*',
          notificationFieldValue: null,
        });
      });

      it('a specific clusterFault', function() {
        controller.policyType = 'clusterFault';
        controller.clusterFaultType = 'blockServiceTooFull';
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'ListClusterFaults',
          streamFieldName: 'code',
          notificationFieldOperator: '=',
          notificationFieldValue: 'blockServiceTooFull',
        });
      });

      it('event', function() {
        controller.policyType = 'event';
        controller.eventType = 'gcEvent';
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'ListEvents',
          streamFieldName: 'eventInfoType',
          notificationFieldOperator: '=',
          notificationFieldValue: 'gcEvent',
        });
      });

      it('failedDrive', function() {
        controller.policyType = 'failedDrive';
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'ListDrives',
          streamFieldName: 'status',
          notificationFieldOperator: '=',
          notificationFieldValue: 'failed',
        });
      });

      it('availableDrive', function() {
        controller.policyType = 'availableDrive';
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'ListDrives',
          streamFieldName: 'status',
          notificationFieldOperator: '=',
          notificationFieldValue: 'available',
        });
      });

      it('utilization', function() {
        controller.policyType = 'utilization';
        controller.clusterUtilizationThreshold = 42;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'GetClusterStats',
          streamFieldName: 'clusterUtilization',
          notificationFieldOperator: '>',
          notificationFieldValue: 42,
        });
      });


      it('usedSpace', function() {
        controller.policyType = 'usedSpace';
        controller.usableSpaceThreshold = 42;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'GetClusterCapacity',
          streamFieldName: 'unUsedSpacePercent',
          notificationFieldOperator: '<',
          notificationFieldValue: 42,
        });
      });

      it('provisionedSpace', function() {
        controller.policyType = 'provisionedSpace';
        controller.provisionableSpaceThreshold = 42;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'GetClusterCapacity',
          streamFieldName: 'unProvisionedSpacePercent',
          notificationFieldOperator: '<',
          notificationFieldValue: 42,
        });
      });

      it('collectorNotReporting', function() {
        controller.policyType = 'collectorNotReporting';
        controller.collectorNotReportingTime = 90;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'CollectorNotReporting',
          streamFieldName: 'downTime',
          notificationFieldOperator: '>',
          notificationFieldValue: 90,
        });
      });

      it('driveWear by wear', function() {
        controller.policyType = 'driveWear';
        controller.driveWearType = 'lifeRemainingPercent';
        controller.driveWearThreshold = 42;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'GetDriveStats',
          streamFieldName: 'lifeRemainingPercent',
          notificationFieldOperator: '<',
          notificationFieldValue: 42,
        });
      });

      it('driveWear by reserve', function() {
        controller.policyType = 'driveWear';
        controller.driveWearType = 'reserveCapacityPercent';
        controller.driveWearThreshold = 42;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'GetDriveStats',
          streamFieldName: 'reserveCapacityPercent',
          notificationFieldOperator: '<',
          notificationFieldValue: 42,
        });
      });

      it('sessions', function() {
        controller.policyType = 'sessions';
        controller.sessionsThreshold = 10;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'GetClusterCapacity',
          streamFieldName: 'activeSessions',
          notificationFieldOperator: '>',
          notificationFieldValue: 10,
        });
      });

      it('licensing', function() {
        controller.policyType = 'licensing';
        controller.capacityLicensingThreshold = 40;
        const fields = controller.getNotificationFields();
        expect(fields).toEqual({
          streamName: 'EntitledLicenseCapacity',
          streamFieldName: 'provisionedSpace',
          notificationFieldOperator: '>',
          notificationFieldValue: 40,
        });
      });

    });
  });
});
