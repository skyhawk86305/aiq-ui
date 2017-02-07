'use strict';

var TableComponent = require('../../components/sf-components.po').table;
var InfoBarComponent = require('../../components/info-bar.po');

var NodesPage = function () {
  var page = this;

  page.el = element(by.css('.nodes-page'));
  page.infoBar = new InfoBarComponent(null, page.el.element(by.css('.info-bar')));
  page.table = new TableComponent('node');
};


module.exports = NodesPage;