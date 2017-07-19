/* jshint expr: true */
'use strict';

const support = require('../support.js');
const expect = support.expect;
const mockBackend = support.mockBackend;
const navbar = new support.navbarComponent();
const RegisterWithNetappSupportPage = require('../page-objects/register-with-netapp-support.po');

const page = new RegisterWithNetappSupportPage();

describe('Register with Netapp Support page', function() {

  beforeAll(function() {
    support.login();
    browser.get('#/account/registerWithNetappSupport');
    expect(browser.getCurrentUrl()).to.eventually.contain('/account/registerWithNetappSupport');
    expect(page.el.isDisplayed()).to.eventually.be.true;
  });

  it('should display the register with netapp support message', function() {
    expect(page.section.header.isDisplayed()).to.eventually.be.true;
    expect(page.section.header.getText()).to.eventually.equal('Not Registered with NetApp Support?');

    expect(page.section.registerButton.isDisplayed()).to.eventually.be.true;
    expect(page.section.registerButton.getText()).to.eventually.equal('Register with NetApp Support');
    expect(page.section.registerButton.getAttribute('href')).to.eventually.equal('https://mysupport.netapp.com/eservice/public/now.do');
    
    expect(page.section.takeMeToAiqLink.isDisplayed()).to.eventually.be.true;
    expect(page.section.takeMeToAiqLink.getText()).to.eventually.equal('Take me to Active IQ');
    expect(page.section.takeMeToAiqLink.getAttribute('href')).to.eventually.contain('/#/dashboard/overview');
  });

  it('should not allow the user to click on the navigation', function() {
    expect(navbar.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.mainNavbar.item('dashboard').isDisplayed()).to.eventually.equal.true;
    expect(navbar.mainNavbar.item('cluster').isDisplayed()).to.eventually.equal.true;
    expect(navbar.mainNavbar.item('admin').isDisplayed()).to.eventually.equal.true;
    expect(navbar.mainNavbar.click('dashboard').then(
      function() { return true; },
      function() { return false; }
    )).to.eventually.be.false;
    expect(browser.getCurrentUrl()).to.eventually.contain('/account/registerWithNetappSupport');
  });

  it('should open the register with netapp support button link in a new tab', function() {
    page.section.registerButton.click();
    expect(page.section.registerButton.getAttribute('href')).to.eventually.equal('https://mysupport.netapp.com/eservice/public/now.do');
  });

  it('should take the user to the dashboard when the take me to active iq link is clicked', function() {
    page.section.takeMeToAiqLink.click();
    expect(browser.getCurrentUrl()).to.eventually.contain('/dashboard/overview');
    browser.getAllWindowHandles().then(function (handles) {
      browser.switchTo().window(handles[1])      
      browser.close();
      browser.switchTo().window(handles[0])
    });
  });

  afterAll(function() {
    support.logout();
  });

});
