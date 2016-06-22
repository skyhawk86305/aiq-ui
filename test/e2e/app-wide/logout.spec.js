'use strict';

var expect = require('../support.js').expect;
var NavbarComponent = require('../../page-objects/navbar.po');
var LogoutPage = require('../../page-objects/logout.po');

var navbar = new NavbarComponent();
var logout = new LogoutPage();
var logoutUrl = browser.baseUrl.replace('index.htm', 'logout.html');

// Needed to test non-angular page
browser.ignoreSynchronization = true;

describe('Logging out', function() {
  afterEach(function() {
    navbar.menu.collapse();
  });

  it('should always be available in the navbar as a menu option', function() {
    browser.get('#');
    expect(navbar.menu.expand().options.get(2).getText()).to.eventually.equal('Logout');
  });

  it('should redirect the user to the logout page', function() {
    navbar.menu.expand().select('Logout');
    expect(browser.getCurrentUrl()).to.eventually.contain('logout.html');
  });

});

describe('The logout page', function() {
  it('should contain a message indicating successful logout', function() {
    browser.get(logoutUrl);
    expect(logout.message.getText()).to.eventually.equal('You have been successfully logged out.');
  });

  it('should allow the user to log back in', function() {
    expect(logout.loginLink.isPresent()).to.eventually.be.true;
  });

});

