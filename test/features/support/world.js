'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var NavbarComponent = require('../../page-objects/navbar.po');
var ApiLogComponent = require('../../page-objects/api-log.po');

function World() {
  chai.use(chaiAsPromised);
  this.expect = chai.expect;

  this.navbar = new NavbarComponent();
  this.apiLog = new ApiLogComponent();
}
module.exports = function () {
  // A new instance of World is created before each scenario
  this.World = World;
};
