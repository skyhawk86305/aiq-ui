/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var LoginComponent = require('../../page-objects/login.po');
var NavbarComponent = require('../../page-objects/navbar.po');
var request = require('request');

var navbar = new NavbarComponent();
var loginForm = new LoginComponent();

var logout = function(callback) {
  request.delete(browser.baseUrl + '/sessions', callback());
};

var login = function(callback) {
  var params = {username: 'testuser@solidfire.com', password: new Buffer('password123').toString('base64')};
  return request({
    method: 'PUT',
    uri: browser.baseUrl + '/sessions',
    json: true,
    body: params
  }, callback());
};

describe('Login Form', function() {
  beforeEach(function(done) {
    logout(function() {
      browser.get('#');
      done();
    });
  });

  it('should not let me click the login button if the fields are empty', function() {
    expect(loginForm.loginButton.el.isEnabled()).to.eventually.be.false;
  });

  it('should not let me click the login button if the password field is empty', function() {
    loginForm.usernameInput.enter('testUser@solidfire.com');
    expect(loginForm.loginButton.el.isEnabled()).to.eventually.be.false;
  });

  it('should not let me click the login button if the username field is empty', function() {
    loginForm.passwordInput.enter('Password123');
    expect(loginForm.loginButton.el.isEnabled()).to.eventually.be.false;
  });

  it('should let me click the login button if the fields are filled out', function() {
    loginForm.usernameInput.enter('testUser@solidfire.com');
    loginForm.passwordInput.enter('Password123');
    expect(loginForm.loginButton.el.isEnabled()).to.eventually.be.true;
  });

  it('should have a password input field type of password', function () {
    expect(loginForm.passwordInput.el.getAttribute('type')).to.eventually.equal('password');
  });

  it('should have a default submit', function () {
    loginForm.passwordInput.enter('password123');
    loginForm.usernameInput.enter('testuser@solidfire.com');
    loginForm.el.submit();
    expect(navbar.el.isPresent()).to.eventually.be.true;
  });
});

describe('Login form input field focus', function() {
  beforeEach(function(done) {
    logout(function() {
      browser.get('#');
      done();
    });
  });

  it('should get focus when selected', function () {
    loginForm.usernameInput.click();
    expect(support.getActiveElement().getAttribute('id')).to.eventually.equal('username-input');
    loginForm.passwordInput.click();
    expect(support.getActiveElement().getAttribute('id')).to.eventually.equal('password-input');
  });
});

describe('Navigation with Authentication', function() {
  afterEach(function(done) {
    login(done);
  });

  it('should not let me navigate to an aiq page via URL if I\'m not unauthenticated', function(done) {
    logout(done);
    browser.get('#/dashboard');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/login');
  });

  it('should redirect me to the login page if my aiq session is invalid when I try to navigate to another page', function(done) {
    browser.get('#');
    navbar.subNavbar.click('dashboard-health').then(function() {
      logout(function() {
        navbar.mainNavbar.click('dashboard');
        done();
      });
    });
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/login');
  });
});
