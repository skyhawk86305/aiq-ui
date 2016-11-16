'use strict';

var HttpBackend = require('httpbackend');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var NavbarComponent = require('../../page-objects/navbar.po');
var ApiLogComponent = require('../../page-objects/api-log.po');
var ClusterSelectComponent = require('../../page-objects/cluster-select.po');
var LoginComponent = require('../../page-objects/login.po');
var TableComponent = require('../../page-objects/table.po');
var ComingSoonComponent = require('../../page-objects/coming-soon.po');
var ClusterOverviewComponent = require('../../page-objects/cluster-overview.po');
var GraphTimeSeries = require('../../page-objects/graph-time-series.po');
var CapacityComponent = require('../../page-objects/capacity.po');

function World() {

  chai.use(chaiAsPromised);
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
  this.loginForm = new LoginComponent();
  this.clusterOverview = new ClusterOverviewComponent();
  this.comingSoonComponent = new ComingSoonComponent();
  this.nodesTable = new TableComponent('node');
  this.drivesTable = new TableComponent('drive');
  this.alertHistoryTable = new TableComponent('alert-history');
  this.alertPolicyTable = new TableComponent('alert-policy');
  this.clusterAlertTable = new TableComponent('alert-table');
  this.eventsTable = new TableComponent('event');
  this.errorLogTable = new TableComponent('error-log');
  this.clusterPerformanceGraph = new GraphTimeSeries('performance-graph');
  this.clusterPerformanceUtilizationGraph = new GraphTimeSeries('utilization-graph');
  this.capacityComponent = new CapacityComponent();

  this.table = function(type) {
    switch(type) {
      case 'node': return this.nodesTable;
      case 'drive': return this.drivesTable;
      case 'alertHistory': return this.alertHistoryTable;
      case 'alertPolicy': return this.alertPolicyTable;
      case 'clusterAlert': return this.clusterAlertTable;
      case 'event': return this.eventsTable;
      case 'errorLog': return this.errorLogTable;
    }
  };

  this.timeSeriesGraph = function(type) {
    switch(type) {
      case 'clusterPerformance': return this.clusterPerformanceGraph;
      case 'clusterPerformanceUtilization': return this.clusterPerformanceUtilizationGraph;
    }
  };

  this.getUniqueKey = function(type) {
    switch (type) {
      case 'node': return 'nodeID';
      case 'drive': return 'driveID';
      case 'alertHistory': return 'id';
      case 'alertPolicy': return 'notificationName';
      case 'clusterAlert': return 'id';
      case 'event' : return 'eventID';
      case 'errorLog' : return 'id';
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
      case 'errorLog':
        return fixture.result.faults.map(function(fault) {
          return fault;
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
          case 'ipcPort': return data ? data.toString() : '-';
          default: return data.toString();
        }
        break;

      case 'alertHistory':
        switch (attr) {
          case 'created': return formatDate(data);
          case 'lastNotified': return formatDate(data);
          case 'isResolved': return data ? 'Yes' : 'No';
          case 'resolved': return formatDate(data);
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
          case 'nodeID': return data ? data.toString() : '-';
          case 'driveID': return data ? data.toString() : '-';
          case 'serviceID': return data ? data.toString() : '-';
          case 'detailsString': return data && data.replace(/\n |\n/g, ' ') || '-';
          default: return data.toString();
        }
        break;

      case 'errorLog':
        switch(attr) {
          case 'created': return formatDate(data);
          case 'resolvedDate': return formatDate(data);
          case 'resolved': return data ? 'Yes' : 'No';
          case 'nodeID': return data ? data.toString() : '-';
          case 'driveID': return data ? data.toString() : '-';
          case 'details': return data && data.replace(/ +$/, '') || '-';
          default: return data.toString();
        }
        break;
      default: return data.toString();
    }
  };

  function formatDate(data) {
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
  }
}
module.exports = function () {
  // A new instance of World is created before each scenario
  this.World = World;
};
