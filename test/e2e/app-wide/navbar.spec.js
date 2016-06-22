'use strict';

var expect = require('../support.js').expect;
var NavbarComponent = require('../../page-objects/navbar.po');

describe('The navbar', function() {
  var navbar = new NavbarComponent();

  it('should display main and sub navbar items on initial page load', function() {
    browser.get('#');
    expect(navbar.mainNavbarItems.count()).to.eventually.equal(2);
    expect(navbar.subNavbarItems.count()).to.eventually.equal(2);
  });

  it('should also contain an api log button and menu with options', function() {
    expect(navbar.apiLog.isPresent()).to.eventually.be.true;
    expect(navbar.menu.button.isPresent()).to.eventually.be.true;
    expect(navbar.menu.expand().options.count()).to.eventually.equal(3);
  });

});
