'use strict';

var GraphTimeSeries = function (componentId, thisElement) {

  var component = this;
  component.el = thisElement || element(by.id(componentId));
  component.title = component.el.element(by.css('.title'));
  component.exportButton = component.el.element(by.css('.export'));

  var legend = component.el.element(by.css('.legend-container'));
  component.legend = {
    el: legend,
    toggle: function(key) {
      legend.element(by.css('.legend-item.-'+key)).click();
      browser.sleep(500); // Wait for D3.js transitions / animations
    }
  };

};

module.exports = GraphTimeSeries;
