'use strict';

module.exports = function() {
  this.Given(/^I see the Cluster Settings form$/, function () {
    return this.expect(this.clusterSettingsPage.form.el.isPresent()).to.eventually.be.true;
  });

  this.When(/^I change the '$field' field to '$input'$/, function (field, input) {
    var world = this;
    return world.clusterSettingsPage.form.inputs[field].clear().then(function() {
      world.clusterSettingsPage.form.inputs[field].sendKeys(input);
    });
  });

  this.When(/^I submit the Cluster Settings form$/, function () {
    this.clusterSettingsPage.form.submit.click();
  });

  this.Then(/^It is pre filled with my cluster settings$/, function (done) {
    var form = this.clusterSettingsPage.form,
        response = this.responses.getConfig.config.cluster;

    this.expect(form.inputs.role.getAttribute('value')).to.eventually.equal(response.role);
    this.expect(form.inputs.hostname.getAttribute('value')).to.eventually.equal(response.name);
    this.expect(form.inputs.membership.getAttribute('value')).to.eventually.equal(response.state);
    this.expect(form.inputs.version.getAttribute('value')).to.eventually.equal(response.version);
    this.expect(form.inputs.interface.getAttribute('value')).to.eventually.equal(response.cipi);
    this.expect(form.inputs.managementInterface.getAttribute('value')).to.eventually.equal(response.mipi);
    this.expect(form.inputs.storageInterface.getAttribute('value')).to.eventually.equal(response.sipi)
      .notify(done);
  });

  this.Then(/^I see '$input' in the '$field' field without an error modal$/, function (input, field, done) {
    this.expect(this.clusterSettingsPage.form.inputs[field].getAttribute('value')).to.eventually.equal(input);
    this.expect(this.clusterSettingsPage.errorModal.isPresent()).to.eventually.be.false
      .notify(done);
  });
};
