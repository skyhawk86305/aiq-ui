'use strict';

var TableComponent = function (model) {
  this.el = element(by.css('.sf-table-container-' + model));
  this.headers = element.all(by.css('div[sf-headers] > .sf-header'));
  this.data = function(type, key, row) {
    return element.all(by.css('.' + type + '-' + key + '-data')).get(row);
  };
  this.rows = element.all(by.css('.sf-table tr'));
};

module.exports = TableComponent;
