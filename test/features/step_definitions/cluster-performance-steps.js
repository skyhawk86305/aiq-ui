'use strict';

module.exports = function() {
  this.Then(/^I see a SolidFire sf-sync-graphs component$/, function () {
    return this.expect(this.performanceComponent.el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a Cluster Utilization graph$/, function () {
    return this.expect(this.performanceComponent.utilizationGraph().el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a Cluster IOPS graph$/, function () {
    return this.expect(this.performanceComponent.iopsGraph().el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a Cluster Bandwidth graph$/, function () {
    return this.expect(this.performanceComponent.bandwidthGraph().el.isDisplayed()).to.eventually.be.true;
  });
};
