'use strict';

var TableComponent = function (type) {
  this.el = element(by.css('.sf-table-container-' + type));
  this.headers = element.all(by.css('.header-label'));
  this.data = function(key, index) {
    return element.all(by.css('.sf-td-' + key)).get(index);
  };
  this.rows = element.all(by.css('.sf-tr'));
};

module.exports = TableComponent;
