'use strict';

module.exports = function() {
  this.Given(/^I see the shared SolidFire navbar$/, function () {
    return this.expect(this.navbar.el.isPresent()).to.eventually.be.true;
  });

  this.When(/^I click on the "(.*)" navbar item "(.*)"$/, function (nav, item) {
    var navbar = nav === 'main' ? this.navbar.mainNavbar : this.navbar.subNavbar;
    navbar.click(item);
  });

  this.When(/^I click on the API log button$/, function () {
    this.navbar.apiLog.click();
  });

  this.When(/^I click on the logout menu option$/, function () {
    this.navbar.menu.expand().select('Logout');
  });

  this.Then(/^I am navigated to the route "(.*)"$/, function (route) {
    return this.expect(browser.getLocationAbsUrl()).to.eventually.contain(route);
  });

  this.Then(/^I see the shared SolidFire API log$/, function () {
    return this.expect(this.apiLog.el.isPresent()).to.eventually.be.true;
  });
};
