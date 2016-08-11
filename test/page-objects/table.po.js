'use strict';

var TableComponent = function (type) {
  this.el = element(by.css('.sf-table-container-' + type));
  this.headers = element.all(by.css('.header-label'));
  this.data = function(key, index) {
    var p = key.indexOf('.');
    if (p >= 0){
      key = key.substring(p + 1, key.length)
    }
    return element.all(by.css('.sf-td-' + key)).get(index).getText();
  };
  this.rows = element.all(by.css('.sf-tr'));
};

module.exports = TableComponent;
