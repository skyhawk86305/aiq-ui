/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var mockBackend = require('../support.js').mockBackend;
var LoginComponent = require('../../page-objects/login.po');

var loginForm = new LoginComponent();

describe('Login Form', function() {
  beforeEach(function() {
    mockBackend.enable(browser);
    mockBackend.http.whenGET('/sessions').respond(function() {
      return [400, {}];
    });
    browser.get('#');
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
