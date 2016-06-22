'use strict';

module.exports = function() {
  this.When(/^I navigate to the '$page' page$/, function (page) {
    browser.get('#/' + page);
  });
};
