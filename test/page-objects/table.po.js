'use strict';

var TableComponent = function (tableId) {
  var table = element(by.id(tableId));
  this.el = table;
  this.headers = table.all(by.css('.sf-header-label'));
  this.data = function(key, index) {
    var p = key.indexOf('.');
    if (p >= 0){
      key = key.substring(p + 1, key.length);
    }
    return table.element(by.css('.sf-tbody')).all(by.css('.sf-td.-' + key)).get(index).getText();
  };
  this.rows = table.element(by.css('.sf-tbody')).all(by.css('.sf-tr'));
};

module.exports = TableComponent;
