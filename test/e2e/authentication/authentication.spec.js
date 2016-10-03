/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
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

fdescribe('Login Form', function() {
  beforeEach(function(done) {
    logout(done);
  });
  afterEach(function(done) {
    login(done);
  });

  it('should not let me click the login button if the fields are empty', function() {
    browser.get('#');
    expect(loginForm.loginButton.el.isEnabled()).to.eventually.be.false;
  });

  it('should not let me click the login button if the username field is empty', function() {
    browser.get('#');
    loginForm.usernameInput.enter('testUser@solidfire.com');
    expect(loginForm.loginButton.el.isEnabled()).to.eventually.be.false;
  });

  it('should not let me click the login button if the password field is empty', function() {
    browser.get('#');
    loginForm.passwordInput.enter('Password123');
    expect(loginForm.loginButton.el.isEnabled()).to.eventually.be.false;
  });

  it('should let me click the login button if the fields are filled out', function() {
    browser.get('#');
    loginForm.usernameInput.enter('testUser@solidfire.com');
    loginForm.passwordInput.enter('Password123');
    expect(loginForm.loginButton.el.isEnabled()).to.eventually.be.true;
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