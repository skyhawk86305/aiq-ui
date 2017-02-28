'use strict';

describe('Component: addAlertPolicy', function() {
  let $scope,
    $location,
    DataService,
    UserInfoService,
    controller,
    q;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function($componentController, $q, $rootScope) {
    $scope = $rootScope.$new();
    $location = { path() {} };
    q = $q;
    DataService = {
      callAPI() {
        return $q.resolve();
      }
    };
    UserInfoService = {
      getUserInfo() {
        return $q.resolve();
      },
      currentUser: {
        username: 'testuser@email.com'
      },
    };
    const locals = { $scope, UserInfoService, DataService, $location };
    controller = $componentController('addAlertPolicy', locals);
    controller.form = {
      $setUntouched: () => {},
      $setPristine: () => {},
    };
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

      spyOn(DataService, 'callAPI').and.returnValue(q.resolve());
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
      $scope.$digest();
      expect(controller.successful).toBe(true);
      expect(controller.error).toBe(null);
    });

    it('should handle a string error from DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue(q.reject('fake error'));
      controller.submit();
      expect(DataService.callAPI).toHaveBeenCalled();
      $scope.$digest();
      expect(controller.successful).toBe(false);
      expect(controller.error).toEqual('fake error');
    });

    it('should handle an error object with message from DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue(q.reject({ message: 'fake error' }));
      controller.submit();
      expect(DataService.callAPI).toHaveBeenCalled();
      $scope.$digest();
      expect(controller.successful).toBe(false);
      expect(controller.error).toEqual('fake error');
    });

    it('should handle an error object with data from DataService', function() {
      spyOn(DataService, 'callAPI').and.returnValue(q.reject({ data: 'fake error' }));
      controller.submit();
      expect(DataService.callAPI).toHaveBeenCalled();
      $scope.$digest();
      expect(controller.successful).toBe(false);
      expect(controller.error).toEqual('fake error');
    });
  });

  describe('cancel()', function() {
    it('should navigate back to the policy list page', function() {
      spyOn($location, 'path');
      controller.cancel();
      expect($location.path).toHaveBeenCalledWith('/dashboard/alerts/policies');
    });
  });

  describe('getClustersAndCustomers()', function() {
    it('should extract the cluster list and customer list from the ListActiveClusters call', function() {
      spyOn(DataService, 'callAPI').and.returnValue(q.resolve({
        clusters: [
          { clusterID: 1, clusterName: 'cl1', customerID: 1, customerName: 'cu1' },
          { clusterID: 2, clusterName: 'cl2', customerID: 1, customerName: 'cu1' },
          { clusterID: 3, clusterName: 'cl3', customerID: 2, customerName: 'cu2' },
          { clusterID: 4, clusterName: 'cl3', customerID: 3, customerName: 'cu3' },
        ],
      }));
      controller.getClustersAndCustomers();
      $scope.$digest();
      expect(DataService.callAPI).toHaveBeenCalled();
      expect(controller.clusters).toEqual([
        { id: 1, name: 'cu1 - cl1' },
        { id: 2, name: 'cu1 - cl2' },
        { id: 3, name: 'cu2 - cl3' },
        { id: 4, name: 'cu3 - cl3' },
      ]);
      expect(controller.customers).toEqual([
        { id: 1, name: 'cu1' },
        { id: 2, name: 'cu2' },
        { id: 3, name: 'cu3' },
      ]);
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
