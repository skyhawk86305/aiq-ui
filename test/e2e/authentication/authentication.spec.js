/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var mockBackend = require('../support.js').mockBackend;
var support = require('../support.js');
var LoginComponent = require('../../page-objects/login.po');
var NavbarComponent = require('../../page-objects/navbar.po');

var loginForm = new LoginComponent();
var navbar = new NavbarComponent();

describe('Login Form', function() {
  beforeEach(function() {
    mockBackend.enable(browser);
    mockBackend.http.whenGET('/sessions').respond(function() {
      return [400, {}];
    });
    browser.get('#').then(function() {
      // Sleep statement currently needed to get test to pass on Jenkins.
      // Further investigation is needed to see if we can find the root
      // of the problem.
      browser.driver.sleep(200);
    });
  });

  afterEach(function() {
    mockBackend.disable();
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
});

describe('Navigation with Authentication', function() {
  beforeEach(function() {
    mockBackend.enable(browser);
    mockBackend.http.whenPOST('/v2/api').passThrough();
  });

  afterEach(function() {
    mockBackend.disable();
  });

  it('should redirect me to the login page if my aiq session is invalid when I try to navigate to another page', function() {
    // Login to site.
    var authMock = mockBackend.http.whenGET('/sessions');
    authMock.respond(function() {
      return [200, {}];
    });

    browser.get('#/dashboard/overview').then(function() {
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard/overview');

      mockBackend.http.reset();
      authMock.respond(function() {
        return [400, {}];
      });

      browser.get('#/dashboard/health');
      expect(browser.getLocationAbsUrl()).to.eventually.contain('/login');
    });
  });

  it('should not let me navigate to an aiq page via URL if I\'m not unauthenticated', function() {
    browser.get('#/dashboard/overview');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/login');
  });
});

describe('Input default and focus', function() {
  beforeEach(function(done) {
    support.logout(done);
  });

  afterEach(function(done) {
    support.login(done);
  });

  it('should have a default submit', function () {
    browser.get('#');
    loginForm.passwordInput.enter('password123');
    loginForm.usernameInput.enter('testuser@solidfire.com');
    loginForm.el.submit();
    expect(navbar.el.isPresent()).to.eventually.be.true;
  });

  it('should get focus when selected', function () {
    browser.get('#');
    loginForm.usernameInput.click();
    expect(support.getActiveElement().getAttribute('id')).to.eventually.equal('username-input');
    loginForm.passwordInput.click();
    expect(support.getActiveElement().getAttribute('id')).to.eventually.equal('password-input');
  });
});
