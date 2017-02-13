'use strict';

var NavbarComponent = function () {
  var component = this;
  
  component.el = element(by.css('.sf-navbar'));
  component.mainNavbar = {
    el: element(by.css('.sf-main-navbar')),
    activeItem: element(by.css('.navbar-item.-main.active')),
    items: element.all(by.css('.navbar-item.-main')),
    click: function(item) {
      return element(by.id('sf-main-navbar-item-' + item)).click();
    }
  };
  component.subNavbar = {
    el: element(by.css('.sf-sub-navbar')),
    activeItem: element(by.css('.navbar-item.-sub.active')),
    items: element.all(by.css('.navbar-item.-sub')),
    click: function(item) {
      return element(by.id('sf-sub-navbar-item-' + item)).click();
    }
  };
  component.subNavMenu = {
    el: element(by.css('.sf-sub-nav-menu')),
    activeItem: element(by.css('.navbar-item.-sub-menu.active')),
    items: element.all(by.css('.navbar-item.-sub-menu')),
    click: function(item) {
      return element(by.id('sf-sub-nav-menu-item-' + item)).click();
    }
  };
  component.apiLog = element(by.id('api-log-anchor'));
  component.menu = {
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
      };
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
