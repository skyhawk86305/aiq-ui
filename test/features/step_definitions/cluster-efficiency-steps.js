'use strict';

module.exports = function() {
  this.Then(/^I see a SolidFire sf-sync-graphs component$/, function () {
    return this.expect(this.efficencyComponent.el.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a Cluster Efficiency graph$/, function () {
    return this.expect(this.efficencyComponent.provisionedGraph().el.isDisplayed()).to.eventually.be.true;
  });
};


