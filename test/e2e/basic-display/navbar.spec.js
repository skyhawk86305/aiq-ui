/* jshint expr: true */
'use strict';

var expect = require('../support.js').expect;
var NavbarComponent = require('../../page-objects/navbar.po');

var navbar = new NavbarComponent();

describe('The main navbar', function() {
  it('should display on initial page load', function() {
    browser.get('#');
    expect(navbar.mainNavbar.el.isPresent()).to.eventually.be.true;
    expect(navbar.mainNavbar.items.count()).to.eventually.equal(3);
  });

  it('should contain an api log button and menu with options', function() {
    expect(navbar.apiLog.isPresent()).to.eventually.be.true;
    expect(navbar.menu.button.isPresent()).to.eventually.be.true;
    expect(navbar.menu.expand().options.count()).to.eventually.equal(2);
  });

  it('should change the URL route and set the active state when clicking on main navbar items', function() {
    navbar.mainNavbar.click('Users');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/users');
    expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('Users');

    navbar.mainNavbar.click('Cluster');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster');
    expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('Cluster');

    navbar.mainNavbar.click('Dashboard');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/dashboard');
    expect(navbar.mainNavbar.activeItem.getText()).to.eventually.equal('Dashboard');
  });

  it('should also set the state of the first sub navbar item to active', function() {
    navbar.mainNavbar.click('Cluster');
    expect(navbar.subNavbar.items.get(0).getAttribute('class')).to.eventually.contain('active');
  });
});

describe('The sub navbar', function() {
  it('should only be displayed if the active main navbar item has sub navbar items', function() {
    navbar.mainNavbar.click('Dashboard');
    expect(navbar.subNavbar.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavbar.items.count()).to.eventually.equal(1);

    navbar.mainNavbar.click('Cluster');
    expect(navbar.subNavbar.el.isDisplayed()).to.eventually.be.true;
    expect(navbar.subNavbar.items.count()).to.eventually.equal(3);

    navbar.mainNavbar.click('Users');
    expect(navbar.subNavbar.el.isDisplayed()).to.eventually.be.false;
  });

  it('should change the URL route and set the active state when clicking on sub navbar items', function() {
    navbar.mainNavbar.click('Cluster');

    navbar.subNavbar.click('Nodes');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/nodes');
    expect(navbar.subNavbar.activeItem.getText()).to.eventually.equal('Nodes');

    navbar.subNavbar.click('Drives');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/drives');
    expect(navbar.subNavbar.activeItem.getText()).to.eventually.equal('Drives');

    navbar.subNavbar.click('Volumes');
    expect(browser.getLocationAbsUrl()).to.eventually.contain('/cluster/volumes');
    expect(navbar.subNavbar.activeItem.getText()).to.eventually.equal('Volumes');
  });
});
