'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var SDK = require('../../../bower_components/solidfire-sdk-js/src/solidfire-instances/node.js');
var NavbarComponent = require('../../page-objects/navbar.po');
var LogoutPage = require('../../page-objects/logout.po');
var ApiLogComponent = require('../../page-objects/api-log.po');
var NetworkSettingsPage = require('../../page-objects/network-settings.po');
var ClusterSettingsPage = require('../../page-objects/cluster-settings.po');

function World() {
  chai.use(chaiAsPromised);
  this.expect = chai.expect;

  this.responses = {};
  this.sdk = new SDK({
    ip: browser.params.ip,
    port: browser.params.port,
    version: browser.params.apiVersion.slice(1),
    username: browser.params.authUsername,
    password: browser.params.authPassword
  });

  this.navbar = new NavbarComponent();
  this.apiLog = new ApiLogComponent();
  this.logoutPage = new LogoutPage();
  this.bond1GPage = new NetworkSettingsPage('bond-one-g');
  this.bond10GPage = new NetworkSettingsPage('bond-ten-g');
  this.clusterSettingsPage = new ClusterSettingsPage();
}
module.exports = function () {
  // A new instance of World is created before each scenario
  console.log(' running tests against browser.baseURL = ' + browser.baseUrl);
  this.World = World;
};
