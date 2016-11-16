'use strict';

module.exports = function() {
  this.Then(/^I see a SolidFire sf-sync-graphs component$/, function () {
    return this.expect(this.capacityComponent.el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a Cluster Provisioned Space graph$/, function () {
    return this.expect(this.capacityComponent.provisionedGraph().el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a Cluster Block Capacity graph$/, function () {
    return this.expect(this.capacityComponent.usedGraph().el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a Cluster Metadata Storage Space graph$/, function () {
    return this.expect(this.capacityComponent.metadataGraph().el.isDisplayed()).to.eventually.be.true;
  });
};

