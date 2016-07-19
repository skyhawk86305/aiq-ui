'use strict';

module.exports = function() {
  this.Given(/^The cluster select drop down is visible$/, function () {
    return this.expect(this.clusterSelect.el.isPresent()).to.eventually.be.true;
  });

  this.When(/^I select cluster "(.*)"$/, function (cluster) {
    this.clusterSelect.open().clusterList.select(cluster);
  });

  this.Then(/^The selected cluster is "(.*)"$/, function (cluster) {
    return this.expect(this.clusterSelect.selectedCluster.getText()).to.eventually.equal(cluster);
  });
};
