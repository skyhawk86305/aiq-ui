'use strict';

var GraphTimeSeriesComponent = function (componentId, thisElement) {

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

  var svg = component.el.element(by.css('.sf-graph > svg'));
  component.svg = {
    el: svg,
    lines: svg.all(by.css('path.line')),
    line: function(key) {
      return svg.element(by.css('path#'+key));
    },
    bars: svg.all(by.css('g')).get(0).all(by.css('.bar')),
    brushedBars: svg.all(by.css('g')).get(0).all(by.css('.bar.selected')),
    brush: {
      el: svg.element(by.css('g.brush')).element(by.css('rect.selection')),
      move: function(x, y) {
        var bar1 = component.svg.bars.get(x),
          bar2 = component.svg.bars.get(y);
        browser.actions().dragAndDrop(bar1, bar2).mouseUp().perform();
      }
    }
  };

  component.brushedRange = {
    start: element(by.css('.brush-range-start')),
    end: element(by.css('.brush-range-end'))
  };
};

module.exports = GraphTimeSeries;
