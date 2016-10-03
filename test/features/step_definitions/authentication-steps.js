'use strict';
module.exports = function() {
  var user;

  this.Given(/^I am a user with a valid login$/, function () {
    user = {username: 'testuser@solidfire.com', password: 'password123'};
  });

  this.Given(/^I am a user with an invalid username$/, function () {
    user = {username: 'testInvalidUser@solidfire.com', password: 'password123'};
  });

  this.Given(/^I am a user with an incorrect password$/, function () {
    user = {username: 'testuser@solidfire.com', password: 'wrongPassword'};
  });

  this.When(/^I attempt to login$/, function () {
    this.loginForm.usernameInput.enter(user.username);
    this.loginForm.passwordInput.enter(user.password);
    this.loginForm.loginButton.click();
  });

  this.When(/^I attempt to logout$/, function () {
    this.navbar.menu.expand().select('Logout');
  });

  this.Then(/^I am successfully logged in$/, function () {
    return this.expect(this.navbar.el.isPresent()).to.eventually.be.true;
  });

  this.Then(/^I am successfully logged out$/, function () {
    return this.expect(this.loginForm.el.isPresent()).to.eventually.be.true;
  });

  this.Then(/^I see I am unsuccessfully logged in$/, function () {
    return this.expect(this.loginForm.errorMessage.getText()).to.eventually.contain('Invalid username or password');
  });
};
