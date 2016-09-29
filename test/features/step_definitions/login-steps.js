'use strict';

module.exports = function() {
  this.Given(/^A user with valid login$/, function () {
    this.user = { username: 'testuser@solidfire.com', password: 'password123' }
  });

  this.Given(/^A user with an incorrect password$/, function () {
    this.user = { username: 'testuser@solidfire.com', password: 'wrongpassword' }
  });

  this.Given(/^A user with an incorrect username$/, function () {
    this.user = { username: 'testFailUser@solidfire.com', password: 'password123' }
  });

  this.Given(/^And that user is not logged in$/, function () {
    this.user = { username: 'testFailUser@solidfire.com', password: 'password123' }
  });

  this.Given(/^And that user is logged in$/, function () {
    this.user = { username: 'testFailUser@solidfire.com', password: 'password123' }
  });

  this.When(/^I select cluster "(.*)"$/, function (cluster) {
    this.clusterSelect.open().clusterList.select(cluster);
  });

  this.Then(/^The selected cluster is "(.*)"$/, function (cluster) {
    return this.expect(this.clusterSelect.selectedCluster.getText()).to.eventually.equal(cluster);
  });
};
