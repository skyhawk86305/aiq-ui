'use strict';

var ComingSoonComponent = function () {
  this.el = element(by.css('.sf-state-error'));
  this.errorMessage = element(by.css('.-title'));
  this.legacyLink = element(by.css('a[ng-href^="http"]'));
};

module.exports = ComingSoonComponent;
