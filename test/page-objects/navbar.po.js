'use strict';

var NavbarComponent = function () {
  this.el = element(by.css('.sf-navbar'));
  this.mainNavbarItems = element.all(by.repeater('mainNavbarItem in config'));
  this.subNavbarItems = element.all(by.repeater('subNavbarItem in subNavbarItems'));
  this.apiLog = element(by.id('api-log-anchor'));
  this.menu = {
    button: element(by.id('navbar-menu')),
    expand: function() {
      element(by.id('navbar-menu')).click();
      return {
        options: element.all(by.css('#navbar-menu-dropdown > .menu-option')),
        select: function(option) {
          switch(option) {
            case('ActiveIQ'): element(by.id('active-iq-anchor')).click(); break;
            case('Support'): element(by.id('support-anchor')).click(); break;
            case('Logout'): element(by.id('logout-anchor')).click(); break;
          }
        }
      }
    },
    collapse: function() {
      element(by.css('#navbar-menu[aria-expanded="true"]')).isPresent().then(function(isPresent) {
        if(isPresent) {
          element(by.id('navbar-menu')).click();
        }
      });
    }
  };
};

module.exports = NavbarComponent;
