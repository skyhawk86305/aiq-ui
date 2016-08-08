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

  this.table = function(type) {
    switch(type) {
      case ('node'): return this.nodesTable;
      case ('drive'): return this.drivesTable;
    }
  };

  this.getUniqueKey = function(type) {
    switch (type) {
      case ('node') : return 'nodeID';
      case ('drive') : return 'driveID';
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
      default: return data.toString();
    }
  };
}
module.exports = function () {
  // A new instance of World is created before each scenario
  this.World = World;
};
