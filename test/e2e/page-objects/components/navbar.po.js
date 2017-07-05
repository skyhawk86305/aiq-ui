'use strict';

var NavbarComponent = function () {
  var component = this;

  component.el = element(by.css('.sf-navbar'));
  component.mainNavbar = {
    el: element(by.css('.sf-main-navbar')),
    activeItem: element(by.css('.navbar-item.-main.active')),
    items: element.all(by.css('.navbar-item.-main')),
    item(name) {
      return element(by.id('sf-main-navbar-item-' + name));
    },
    click(itemName) {
      return this.item(itemName).click();
    },
  };
  component.subNavbar = {
    el: element(by.css('.sf-sub-navbar')),
    activeItem: element(by.css('.navbar-item.-sub.active')),
    items: element.all(by.css('.navbar-item.-sub')),
    item(name) {
      return element(by.id('sf-sub-navbar-item-' + name));
    },
    click(itemName) {
      return this.item(itemName).click();
    },
  };
  component.subNavMenu = {
    el: element(by.css('.sf-sub-nav-menu')),
    activeItem: element(by.css('.navbar-item.-sub-menu.active')),
    items: element.all(by.css('.navbar-item.-sub-menu')),
    item(name) {
      return element(by.id('sf-sub-nav-menu-item-' + name));
    },
    click(itemName) {
      return this.item(itemName).click();
    },
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
  component.breadcrumb = {
    el: element(by.id('sf-breadcrumb')),
    main: element(by.css('#sf-breadcrumb .main-breadcrumb')),
    mainLink: element(by.css('#sf-breadcrumb .main-breadcrumb a')),
    sub: element(by.css('#sf-breadcrumb .sub-breadcrumb')),
    subLink: element(by.css('#sf-breadcrumb .sub-breadcrumb a')),
    menu: element(by.css('#sf-breadcrumb .menu-breadcrumb'))
  }
};

module.exports = NavbarComponent;
