'use strict';

var HttpBackend = require('httpbackend');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var NavbarComponent = require('../../page-objects/navbar.po');
var ApiLogComponent = require('../../page-objects/api-log.po');
var ClusterSelectComponent = require('../../page-objects/cluster-select.po');
var TableComponent = require('../../page-objects/table.po');

function World() {
  var formatDate;

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
  this.nodesTable = new TableComponent('node');
  this.drivesTable = new TableComponent('drive');
  this.alertHistoryTable = new TableComponent('alert-history');

  this.table = function(type) {
    switch(type) {
      case ('node'): return this.nodesTable;
      case ('drive'): return this.drivesTable;
      case ('alertHistory'): return this.alertHistoryTable;
    }
  };

  this.getUniqueKey = function(type) {
    switch (type) {
      case ('node') : return 'nodeID';
      case ('drive') : return 'driveID';
      case ('alertHistory') : return 'id';
    }
  };

  this.getFixtureData = function(type, method) {
    var fixture = require('../../fixtures/'+method);
    switch(type) {
      case ('node'):
        return fixture.result.nodes.map(function(node) {
          return node;
        });
      case ('drive'):
        return fixture.result.drives.map(function(drive) {
          drive.lifeRemainingPercent = drive.driveStats ? drive.driveStats.lifeRemainingPercent :'';
          drive.reserveCapacityPercent  = drive.driveStats ? drive.driveStats.reserveCapacityPercent : '';
          return drive;
        });
      case ('alertHistory'):
        return fixture.result.alerts.map(function(history) {
          history.notificationName = history.notification && history.notification.notificationName || '';
          history.destinationEmail = history.notification && history.notification.destinationEmail || '';
          history.policyDescription = history.notification && 'Fault Code is any value' || '';

          return history;
        });
      default:
        console.log('Invalid fixture type!');
        return [];
    }
  };

  this.formatFixtureData = function(data, type, attr) {
    switch(type) {
      case ('node'):
        switch(attr) {
          default: return data.toString();
        }
      break;
      case ('alertHistory'):
        switch(attr) {
          case 'created': return formatDate(data);
          case 'lastNotified': return formatDate(data);
          case 'isResolved': return data ? 'Yes' : 'No';
          case 'resolved': return formatDate(data);
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
        date.getHours() + ':' +
        date.getMinutes() + ':' +
        date.getSeconds();
    } else {
      return '-';
    }
  };
}
module.exports = function () {
  // A new instance of World is created before each scenario
  this.World = World;
};
