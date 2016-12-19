/* jshint expr: true */
'use strict';

var support = require('../support.js');
var expect = support.expect;
var mockBackend = support.mockBackend;
var LoginPage = require('../page-objects/login.po');
var NavbarComponent = require('../page-objects/components/navbar.po');

var loginPage = new LoginPage();
var navbar = new NavbarComponent();

describe('Authentication', function() {
  describe('Login Page', function() {
    beforeEach(function() {
      mockBackend.enable(browser);
      mockBackend.http.whenGET('/sessions').respond(function() {
        return [400, {}];
      });
      browser.get('#').then(function() {
        // Sleep statement currently needed to get test to pass on Jenkins.
        // Further investigation is needed to see if we can find the root
        // of the problem.
        browser.driver.sleep(400);
      });
    });

    afterEach(function() {
      mockBackend.disable();
    });

    it('should not let me click the login button if the fields are empty', function() {
      expect(loginPage.loginButton.el.isEnabled()).to.eventually.be.false;
    });

    it('should not let me click the login button if the password field is empty', function() {
      loginPage.usernameInput.enter('testUser@solidfire.com');
      expect(loginPage.loginButton.el.isEnabled()).to.eventually.be.false;
    });

    it('should not let me click the login button if the username field is empty', function() {
      loginPage.passwordInput.enter('Password123');
      expect(loginPage.loginButton.el.isEnabled()).to.eventually.be.false;
    });

    it('should let me click the login button if the fields are filled out', function() {
      loginPage.usernameInput.enter('testUser@solidfire.com');
      loginPage.passwordInput.enter('Password123');
      expect(loginPage.loginButton.el.isEnabled()).to.eventually.be.true;
    });

    it('should have a password input field type of password', function () {
      expect(loginPage.passwordInput.el.getAttribute('type')).to.eventually.equal('password');
    });
  });

  describe('Navigation with Authentication', function() {
    beforeEach(function() {
      mockBackend.enable(browser);
      mockBackend.http.whenPOST('/json-rpc/2.0').passThrough();
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

  describe('Logging In', function() {
    beforeEach(function(done) {
      support.logout(function() {
        browser.get('#').then(done);
      });
    });

    afterEach(function(done) {
      support.login(done);
    });

    it('should get focus when selected', function () {
      loginPage.usernameInput.click();
      expect(support.getActiveElement().getAttribute('id')).to.eventually.equal('username-input');
      loginPage.passwordInput.click();
      expect(support.getActiveElement().getAttribute('id')).to.eventually.equal('password-input');
    });

    it('should take me to the home page if valid credentials', function () {
      loginPage.passwordInput.enter('password123');
      loginPage.usernameInput.enter('testuser@solidfire.com');
      loginPage.el.submit();
      expect(navbar.el.isPresent()).to.eventually.be.true;
    });

    it('should login when pressing the enter key if a valid username and password are entered', function () {
      loginPage.passwordInput.enter('password123');
      loginPage.usernameInput.enter('testuser@solidfire.com');
      support.pressEnterKey();
      expect(navbar.el.isPresent()).to.eventually.be.true;
    });

    it('should display an error if invalid username', function () {
      loginPage.passwordInput.enter('password123');
      loginPage.usernameInput.enter('testInvalidUser@solidfire.com');
      loginPage.el.submit();
      expect(loginPage.errorMessage.getText()).to.eventually.contain('Invalid username or password');
    });

    it('should display an error if invalid password', function () {
      loginPage.passwordInput.enter('wrongPassword');
      loginPage.usernameInput.enter('testuser@solidfire.com');
      loginPage.el.submit();
      expect(loginPage.errorMessage.getText()).to.eventually.contain('Invalid username or password');
    });
  });

  describe('Logging Out', function() {
    afterEach(function(done) {
      support.login(done);
    });

    it('should take me to the login page', function () {
      browser.get('#');
      navbar.menu.expand().select('Logout');
      expect(loginPage.el.isPresent()).to.eventually.be.true;
    });
  });
});
