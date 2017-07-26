'use strict';

var expect = require('../../support.js').expect;
var SyncGraphsComponent = require('../../page-objects/components/sf-components.po').syncGraphs;
var performanceGraphs = new SyncGraphsComponent('performance-sync-graphs');
var support = require('../../support.js');
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

describe('The Cluster Performance Page', function () {

  beforeAll(function (done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function (firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function (done) {
    browser.get('#/cluster/' + clusterId + '/reporting/performance').then(done);
  });

  afterAll(function () {
    support.logout();
  });

  it('@any @smoke should display a sync-graphs component on page load', function () {
    expect(performanceGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any should have custom static date range options', function (done) {
    var expectedDateRangeOptions = ['Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'],
      actualDateRangeOptions = performanceGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (var i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5).notify(done);
  });

  it('@any should have a default date range selected', function () {
    expect(performanceGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  it('@any should have a specific graph selected as the initial context', function () {
    expect(performanceGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('iops-context');
  });

  describe('Performance Graph', function () {
    var graphs = {
        iops: {
          id: 'iops',
          label: 'IOPS',
          seriesIds: ['readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec'],
          seriesLabels: ['Read IOPS', 'Write IOPS', 'Total IOPS']
        },
        throughput: {
          id: 'throughput',
          label: 'Throughput',
          seriesIds: ['readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec'],
          seriesLabels: ['Read Throughput', 'Write Throughput', 'Total Throughput']
        },
        utilization: {
          id: 'utilization',
          label: 'Utilization',
          seriesIds: ['clusterUtilizationPct'],
          seriesLabels: ['Utilization']
        },
      },
      graphKeys = Object.keys(graphs);

    it('@any @smoke should have 3 child graphs with the expected labels', function () {
      expect(performanceGraphs.graphSelectorPanel.graphSelections.count()).to.eventually.equal(graphKeys.length);
      for (var i = 0; i < graphKeys.length; i++) {
        var graph = graphs[graphKeys[i]];
        expect(performanceGraphs.graphSelectorPanel.graphSelection(graph.id).label.getText()).to.eventually.equal(graph.label);
        expect(performanceGraphs.graphSelectorPanel.graphSelection(graph.id).sparkline.el.isPresent()).to.eventually.be.true;
      }
    });

    describe('selecting a graph', function () {
      it('@any @smoke should change the context graph and the selected graph (including its title, expected lines, a legend (if applicable), and an export button)', function () {
        var previousGraph = graphs[graphKeys[0]];

        expect(performanceGraphs.graphSelectorPanel.graphSelection(previousGraph.id).el.getAttribute('class')).to.eventually.contain('active');
        expect(performanceGraphs.selectedGraph.graph(previousGraph.id).el.isPresent()).to.eventually.be.true;
        expect(performanceGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.contain(previousGraph.id);
        checkSelectedGraphElements(previousGraph);

        for (var i = 1; i < graphKeys.length; i++) {
          var graph = graphs[graphKeys[i]];
          performanceGraphs.graphSelectorPanel.graphSelection(graph.id).el.click();
          isSelectedAndContextGraphUpdated(graph);
          checkSelectedGraphElements(graph);
          previousGraph = graph;
        }

        function isSelectedAndContextGraphUpdated(graph) {
          expect(performanceGraphs.graphSelectorPanel.graphSelection(previousGraph.id).el.getAttribute('class')).to.eventually.not.contain('active');
          expect(performanceGraphs.graphSelectorPanel.graphSelection(graph.id).el.getAttribute('class')).to.eventually.contain('active');
          expect(performanceGraphs.selectedGraph.graph(previousGraph.id).el.isPresent()).to.eventually.be.false;
          expect(performanceGraphs.selectedGraph.graph(graph.id).el.isPresent()).to.eventually.be.true;
          expect(performanceGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.contain(graph.id);
          expect(performanceGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.not.contain(previousGraph.id);
        }

        function checkSelectedGraphElements(graph) {
          expect(performanceGraphs.selectedGraph.graph(graph.id).title.getText()).to.eventually.equal(graph.label);
          expect(performanceGraphs.selectedGraph.graph(graph.id).exportButton.isPresent()).to.eventually.be.true;

          expect(performanceGraphs.selectedGraph.graph(graph.id).svg.lines.count()).to.eventually.equal(graph.seriesIds.length);
          for (var i = 0; i < graph.seriesIds.length; i++) {
            expect(performanceGraphs.selectedGraph.graph(graph.id).svg.line(graph.seriesIds[i]).isDisplayed()).to.eventually.be.true;
            if (graph.seriesLabels) {
              expect(performanceGraphs.selectedGraph.graph(graph.id).legend.legendItem(graph.seriesIds[i]).label.getText()).to.eventually.equal(graph.seriesLabels[i]);
            }
          }
        }
      });
    });
  });
});
