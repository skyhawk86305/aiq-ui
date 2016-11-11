'use strict';
var GraphTimeSeries = require('./graph-time-series.po');

var EfficiencyComponent = function () {
  var component = this,
      contextButtons;

  component.el = element(by.tagName('sf-sync-graphs'));
  component.contextGraph = {
    el: element(by.id('cluster-efficiency-context'))
  };
  component.contextButtons = function () {
    contextButtons = element(by.css('.selection-buttons'));
    return {
      el: contextButtons,
      count: contextButtons.all(by.css('.button')).count(),
      efficiency: contextButtons.element(by.css('.-sync-graph-1-service'))
    };
  };
  component.graphs = {
    efficiencyGraph: new GraphTimeSeries('sync-graph-1-service')
  };
};


module.exports = EfficiencyComponent;
