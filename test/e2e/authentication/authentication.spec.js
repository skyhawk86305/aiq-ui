/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var mockBackend = require('../support.js').mockBackend;
var LoginComponent = require('../../page-objects/login.po');

var loginForm = new LoginComponent();

describe('Login Form', function() {
  beforeEach(function() {
    mockBackend.enable(browser);
    browser.get('#');
    mockBackend.http.whenGET('/sessions').respond(400);
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
    browser.get('#');
    mockBackend.http.whenGET('/sessions').respond(400);
  });

  afterEach(function() {
    mockBackend.disable();
  });
  xit('should redirect me to the login page if my aiq session is invalid when I try to navigate to another page', function() {
    //TODO: figure out a way to log out through the backend 
  });

  it('should not let me navigate to an aiq page via URL if I\'m not unauthenticated', function() {
    browser.get('#/dashboard/overview');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/login');
  });
});