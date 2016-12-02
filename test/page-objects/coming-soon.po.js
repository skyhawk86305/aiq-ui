'use strict';

var ComingSoonPage = function () {
  var page = this;

  page.el = element(by.css('.sf-state-error'));
  page.errorMessage = element(by.css('.-title'));
  page.legacyLink = element(by.css('a[ng-href^="http"]'));
};

module.exports = ComingSoonPage;
