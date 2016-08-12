'use strict';

var HttpBackend = require('httpbackend');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var NavbarComponent = require('../../page-objects/navbar.po');
var ApiLogComponent = require('../../page-objects/api-log.po');
var ClusterSelectComponent = require('../../page-objects/cluster-select.po');
var TableComponent = require('../../page-objects/table.po');

function World() {

  chai.use(chaiAsPromised);
  var formatDate, formatBoolean;
  this.expect = chai.expect;
  this.mockBackend = {
    http: null,
    enable: function(browser) {
      this.http = new HttpBackend(browser);
      this.http.whenGET(/tpl.html/).passThrough();
    },
    disable: function() {
      this.http.clear();
    }
  };

  this.navbar = new NavbarComponent();
  this.apiLog = new ApiLogComponent();
  this.clusterSelect = new ClusterSelectComponent();
  this.nodesTable = new TableComponent('node');
  this.drivesTable = new TableComponent('drive');
  this.alertHistoryTable = new TableComponent('alert-history');
  this.alertPolicyTable = new TableComponent('alert-policy');
  this.eventsTable = new TableComponent('event');
  this.errorLogTable = new TableComponent('error-log');

  this.table = function(type) {
    switch(type) {
      case 'node': return this.nodesTable;
      case 'drive': return this.drivesTable;
      case 'alertHistory': return this.alertHistoryTable;
      case 'alertPolicy': return this.alertPolicyTable;
      case 'event': return this.eventsTable;
      case 'error-log': return this.errorLogTable;
    }
  };

  this.getUniqueKey = function(type) {
    switch (type) {
      case 'node': return 'nodeID';
      case 'drive': return 'driveID';
      case 'alertHistory': return 'id';
      case 'alertPolicy': return 'notificationName';
      case 'event' : return 'eventID';
      case 'error-log' : return 'id';
    }
  };

  this.getFixtureData = function(type, method) {
    var fixture = require('../../fixtures/'+method);
    switch(type) {
      case 'node':
        return fixture.result.nodes.map(function(node) {
          return node;
        });

      case 'drive':
        return fixture.result.drives.map(function(drive) {
          drive.lifeRemainingPercent = drive.driveStats ? drive.driveStats.lifeRemainingPercent :'';
          drive.reserveCapacityPercent  = drive.driveStats ? drive.driveStats.reserveCapacityPercent : '';
          return drive;
        });

      case 'event':
        return fixture.result.events.map(function(event) {
          event.detailsString = event.details ? JSON.stringify(event.details, null, 1) : '-';
          return event;
        });

      case 'alertHistory':
        return fixture.result.alerts.map(function(history) {
          history.notificationName = history.notification && history.notification.notificationName || '';
          history.destinationEmail = history.notification && history.notification.destinationEmail || '';
          history.policyDescription = history.notification && 'Fault Code is any value' || '';

          return history;
        });

      case 'alertPolicy':
        return fixture.result.notifications.map(function(policy) {
          policy.policyDescription = 'Fault Code is any value';

          return policy;
        });
      case 'error-log':
        return fixture.result.faults.map(function(faults) {
          return faults;
        });

      default:
        console.log('Invalid fixture type!');
        return [];
    }
  };

  this.formatFixtureData = function(data, type, attr) {
    switch (type) {
      case 'node':
        switch (attr) {
          case 'ipcPort': return data && data || '-';
          default: return data.toString();
        }
        break;

      case 'alertHistory':
        switch (attr) {
          case 'created': return formatDate(data);
          case 'lastNotified': return formatDate(data);
          case 'isResolved': return data ? 'Yes' : 'No';
          case 'resolved': return formatDate(data);
          case 'ipcPort': return data || '-';
          default: return data.toString();
        }
        break;

      case 'alertPolicy':
        switch (attr) {
          case 'customerName': return data || '-';
          case 'clusterName': return data || '-';
          default: return data.toString();
        }
        break;

      case 'event':
        switch(attr) {
          case 'timeOfReport': return formatDate(data);
          case 'nodeID': return data && data.toString() || '-';
          case 'driveID': return data && data.toString() || '-';
          case 'serviceID': return data && data.toString() || '-';
          case 'detailsString': return data && data.replace(/\n |\n/g, ' ') || '-';
          default: return data.toString();
        }
        break;

      case 'error-log':
        switch(attr) {
          case 'created': return formatDate(data);
          case 'resolvedDate': return formatDate(data);
          case 'resolved': return formatBoolean(data);
          case 'nodeID': return data && data.toString() || '-';
          case 'driveID': return data && data.toString() || '-';
          case 'details': return data && data.replace(/ +$/, '') || '-';
          default: return data.toString();
        }
        break;
      default: return data.toString();
    }
  };

  formatDate = function(data) {
    if (data) {
      var date = new Date(Date.parse(data));
      return isNaN(date) ? data :
        date.getFullYear() + '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
        ('0' + date.getDate()).slice(-2) + ' ' +
        ('0' + date.getHours()).slice(-2) + ':' +
        ('0' + date.getMinutes()).slice(-2) + ':' +
        ('0' + date.getSeconds()).slice(-2);
    } else {
      return '-';
    }
  };

  formatBoolean = function(data) {
    if (data) {
      return 'Yes';
    } else {
      return 'No';
    }
  };
}
module.exports = function () {
  // A new instance of World is created before each scenario
  this.World = World;
};
