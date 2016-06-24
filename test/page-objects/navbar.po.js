'use strict';

var NavbarComponent = function () {
  this.el = element(by.css('.sf-navbar'));
  this.mainNavbar = {
    el: element(by.css('.sf-main-navbar')),
    activeItem: element(by.css('.navbar-item.-main.active')),
    items: element.all(by.repeater('mainNavbarItem in config')),
    click: function(item) {
      element(by.id('main-navbar-' + item.toLowerCase())).click();
    }
  };
  this.subNavbar = {
    el: element(by.css('.sf-sub-navbar')),
    activeItem: element(by.css('.navbar-item.-sub.active')),
    items: element.all(by.repeater('subNavbarItem in subNavbarItems')),
    click: function(item) {
      element(by.id('sub-navbar-' + item.toLowerCase())).click();
    }
  };
  this.apiLog = element(by.id('api-log-anchor'));
  this.menu = {
    button: element(by.id('navbar-menu')),
    expand: function() {
      element(by.id('navbar-menu')).click();
      return {
        options: element.all(by.css('#navbar-menu-dropdown > .menu-option')),
        select: function(option) {
          switch(option) {
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
