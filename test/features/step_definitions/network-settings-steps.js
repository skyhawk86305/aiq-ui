'use strict';

module.exports = function() {
  this.When(/^I change the '$type' '$field' field to '$input'$/, function (type, field, input) {
    var world = this;
    return page(world,type).form.inputs[field].clear().then(function() {
      page(world,type).form.inputs[field].sendKeys(input);
    });
  });

  this.When(/^I submit the '$type' form$/, function (type) {
    page(this,type).form.submit.click();
  });

  this.Then(/^I see the '$type' form$/, function (type) {
    return this.expect(page(this,type).form.el.isPresent()).to.eventually.be.true;
  });

  this.Then(/^It is pre filled with my '$type' settings$/, function (type, done) {
    var formInputs = page(this,type).form.inputs,
        response = this.responses.getConfig.config.network[type];
    this.expect(formInputs.address.getAttribute('value')).to.eventually.equal(response.address);
    this.expect(formInputs.netmask.getAttribute('value')).to.eventually.equal(response.netmask);
    this.expect(formInputs.gateway.getAttribute('value')).to.eventually.equal(response.gateway);
    this.expect(formInputs.mtu.getAttribute('value')).to.eventually.equal(response.mtu);
    this.expect(formInputs.bondMode.getAttribute('value')).to.eventually.equal(response['bond-mode']);
    this.expect(formInputs.status.getAttribute('value')).to.eventually.equal(response.status)
      .notify(done);
  });

  this.Then(/^I see '$input' in the '$type' '$field' field without an error modal$/, function (input, type, field, done) {
    this.expect(page(this,type).form.inputs[field].getAttribute('value')).to.eventually.equal(input);
    this.expect(page(this,type).errorModal.isPresent()).to.eventually.be.false
      .notify(done);
  });

  /*
   * Private Helper Functions
   */

  function page(world, type) {
    return type === 'Bond1G' ? world.bond1GPage : world.bond10GPage;
  }
};
