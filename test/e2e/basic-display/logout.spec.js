'use strict';

var expect = require('../support.js').expect;
var NavbarComponent = require('../../page-objects/navbar.po');

var navbar = new NavbarComponent();

describe('Logging out', function() {
  afterEach(function() {
    navbar.menu.collapse();
  });

  it('should always be available in the navbar as a menu option', function() {
    browser.get('#');
    expect(navbar.menu.expand().options.get(1).getText()).to.eventually.equal('Logout');
  });
});
