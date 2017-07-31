'use strict';

const support = require('../support.js');
const expect = support.expect;
const mockBackend = support.mockBackend;
const AIQLoginPage = require('../page-objects/aiq-login.po');
const SSOLoginPage = require('../page-objects/sso-login.po');

const aiqLoginPage = new AIQLoginPage();
const ssoLoginPage = new SSOLoginPage();
const navbar = new support.navbarComponent();

describe('Authentication', function() {
  describe('Aiq Login Page', function() {
    beforeEach(function() {
      mockBackend.enable(browser);
      mockBackend.http.whenGET('/sessions').respond(function() {
        return [404, {}];
      });
      browser.get('#/aiq-login');
    });

    afterEach(function() {
      mockBackend.disable();
    });

    it('should not let me click the login button if the fields are empty', function() {
      expect(aiqLoginPage.loginButton.el.isEnabled()).to.eventually.be.false;
    });

    it('should not let me click the login button if the password field is empty', function() {
      aiqLoginPage.usernameInput.enter('testUser@solidfire.com');
      expect(aiqLoginPage.loginButton.el.isEnabled()).to.eventually.be.false;
    });

    it('should not let me click the login button if the username field is empty', function() {
      aiqLoginPage.passwordInput.enter('Password123');
      expect(aiqLoginPage.loginButton.el.isEnabled()).to.eventually.be.false;
    });

    it('should let me click the login button if the fields are filled out', function() {
      aiqLoginPage.usernameInput.enter('testUser@solidfire.com');
      aiqLoginPage.passwordInput.enter('Password123');
      expect(aiqLoginPage.loginButton.el.isEnabled()).to.eventually.be.true;
    });

    it('should have a password input field type of password', function () {
      expect(aiqLoginPage.passwordInput.el.getAttribute('type')).to.eventually.equal('password');
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
      const authMock = mockBackend.http.whenGET('/sessions');
      authMock.respond( () => [200, {}] );

      browser.get('#/dashboard/overview').then(function() {
        expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');

        mockBackend.http.reset();
        authMock.respond(function() {
          return [404, {}];
        });

        browser.get('#/dashboard/health');
        expect(browser.getCurrentUrl()).to.eventually.contain('/login');
      });
    });

    it(`should not let me navigate to an aiq page via URL if I'm not unauthenticated`, function() {
      browser.get('#/dashboard/overview');
      expect(browser.getCurrentUrl()).to.eventually.contain('/login');
    });
  });

  describe('Logging In with AIQ Account', function() {
    beforeEach(function() {
      browser.get('#/sso-login').then( () => ssoLoginPage.aiqLoginButton.click() );
    });

    it('should display the SSO push modal', function () {
      expect(ssoLoginPage.pushModal.el.isDisplayed()).to.eventually.be.true;
      expect(ssoLoginPage.pushModal.backdrop.isDisplayed()).to.eventually.be.true;
      expect(ssoLoginPage.pushModal.closeButton.isDisplayed()).to.eventually.be.true;
      expect(ssoLoginPage.pushModal.yesButton.isDisplayed()).to.eventually.be.true;
      expect(ssoLoginPage.pushModal.noButton.isDisplayed()).to.eventually.be.true;
    });

    it('clicking the close button should close the modal', function () {
      ssoLoginPage.pushModal.closeButton.click();
      expect(ssoLoginPage.pushModal.el.isPresent()).to.eventually.be.false;
    });

    it(`clicking the 'Yes, I have an account' button should go to the NetApp login page`, function () {
      ssoLoginPage.pushModal.yesButton.click();
      browser.ignoreSynchronization = true;
      expect(browser.getCurrentUrl()).to.eventually.contain('/sso/login');
      browser.ignoreSynchronization = false;
    });

    it(`clicking the 'No, I want to register' button should redirect to the correct page and open the NetApp register in a new tab`, function () {
      ssoLoginPage.pushModal.noButton.click();

      browser.getAllWindowHandles().then(function (handles) {
        browser.driver.switchTo().window(handles[1]);
        browser.ignoreSynchronization = true;
        expect(browser.getCurrentUrl()).to.eventually.equal("https://mysupport.netapp.com/eservice/public/now.do");
        browser.ignoreSynchronization = false;
        browser.driver.close();
        browser.driver.switchTo().window(handles[0]);
      });
      expect(ssoLoginPage.pushModal.el.isPresent()).to.eventually.be.false;
    });

    describe('logging in', function() {

      beforeEach(function() {
        ssoLoginPage.pushModal.closeButton.click();
        expect(browser.getCurrentUrl()).to.eventually.contain('/aiq-login');
      });

      it('should get focus when selected', function () {
        aiqLoginPage.usernameInput.click();
        expect(support.getActiveElement().getAttribute('id')).to.eventually.equal('username-input');
        aiqLoginPage.passwordInput.click();
        expect(support.getActiveElement().getAttribute('id')).to.eventually.equal('password-input');
      });

      it('should take me to the home page if valid credentials', function () {
        aiqLoginPage.passwordInput.enter('password123');
        aiqLoginPage.usernameInput.enter('testuser@solidfire.com');
        aiqLoginPage.el.submit();
        expect(navbar.el.isPresent()).to.eventually.be.true;
      });

      it('should login when pressing the enter key if a valid username and password are entered', function () {
        aiqLoginPage.passwordInput.enter('password123');
        aiqLoginPage.usernameInput.enter('testuser@solidfire.com');
        support.pressEnterKey();
        expect(navbar.el.isPresent()).to.eventually.be.true;
      });

      it('should display an error if invalid username', function () {
        aiqLoginPage.passwordInput.enter('password123');
        aiqLoginPage.usernameInput.enter('testInvalidUser@solidfire.com');
        aiqLoginPage.el.submit();
        expect(aiqLoginPage.errorMessage.getText()).to.eventually.contain('Invalid username or password');
      });

      it('should display an error if invalid password', function () {
        aiqLoginPage.passwordInput.enter('wrongPassword');
        aiqLoginPage.usernameInput.enter('testuser@solidfire.com');
        aiqLoginPage.el.submit();
        expect(aiqLoginPage.errorMessage.getText()).to.eventually.contain('Invalid username or password');
      });
    });
  });

  describe('Logging Out', function() {
    beforeEach(function() {
      support.login();
      expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
    });

    it('should take me to the login page', function () {
      navbar.menu.expand().select('Logout');
      expect(aiqLoginPage.el.isPresent()).to.eventually.be.true;
    });
  });
});
