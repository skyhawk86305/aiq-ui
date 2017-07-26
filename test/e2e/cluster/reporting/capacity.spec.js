'use strict';

const support = require('../../support.js');
const expect = require('../../support.js').expect;
const CapacityPage = require('../../page-objects/cluster/reporting/capacity.po');
const capacityPage = new CapacityPage();
const capacitySyncGraphs = capacityPage.syncGraphs;
const clusterSelect = new support.clusterSelectComponent();

describe('The Cluster Capacity Page', function () {
  let clusterID;

  beforeAll(function () {
    support.login();
    const openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function (firstClusterId) {
      clusterID = firstClusterId;
    });
  });

  beforeEach(function () {
    browser.get(`#/cluster/${clusterID}/reporting/capacity`);
  });

  afterAll(function () {
    support.logout();
  });

  it('@any @smoke should display a sync-graphs component on page load', function () {
    expect(capacityPage.syncGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any should have custom static date range options', function () {
    const expectedDateRangeOptions = ['Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'];
    const actualDateRangeOptions = capacityPage.syncGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (let i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5);
  });

  it('@any should have a default date range selected', function () {
    expect(capacityPage.syncGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  it('@any should have a specific graph selected as the initial context', function () {
    expect(capacityPage.syncGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('block-capacity-context');
  });

  describe('Capacity Graph', function () {
    var graphs = {
        block: {
          id: 'block-capacity',
          label: 'Block Capacity',
          seriesIds: ['maxUsedSpace', 'usedSpace'],
          seriesLabels: ['Max Used Space', 'Used Space']
        },
        metadata: {
          id: 'metadata-capacity',
          label: 'Metadata Capacity',
          seriesIds: ['maxUsedMetadataSpace', 'usedMetadataSpace'],
          seriesLabels: ['Total Capacity', 'Used Metadata Space']
        },
        provisioned: {
          id: 'provisioned-space',
          label: 'Provisioned Space',
          seriesIds: ['maxProvisionedSpace', 'provisionedSpace'],
          seriesLabels: ['Max Provisioned Space', 'Provisioned Space']
        },
      },
      graphKeys = Object.keys(graphs);

    it('@any @smoke should have 3 child graphs with the expected labels', function () {
      expect(capacitySyncGraphs.graphSelectorPanel.graphSelections.count()).to.eventually.equal(graphKeys.length);
      for (var i = 0; i < graphKeys.length; i++) {
        var graph = graphs[graphKeys[i]];
        expect(capacitySyncGraphs.graphSelectorPanel.graphSelection(graph.id).label.getText()).to.eventually.equal(graph.label);
        expect(capacitySyncGraphs.graphSelectorPanel.graphSelection(graph.id).sparkline.el.isPresent()).to.eventually.be.true;
      }
    });

    describe('the info bars', function() {
      describe('should show the correct info bars depending on the selected graph:', function() {
        it('block capacity info bar', function() {
          const infoBar = capacityPage.infoBars.blockCapacity;

          capacitySyncGraphs.graphSelectorPanel.graphSelection('block-capacity').el.click();
          expect(capacitySyncGraphs.graphSelectorPanel.graphSelection('block-capacity').el.getAttribute('class')).to.eventually.contain('active');
          expect(infoBar.el.isDisplayed()).to.eventually.be.true;
          expect(capacityPage.infoBars.metadataCapacity.el.isPresent()).to.eventually.be.false;

          expect(infoBar.infoBoxes.count()).to.eventually.equal(5);
          const expectedBoxes = ['used-capacity', 'warning-threshold', 'error-threshold', 'total-capacity', 'current-state'];
          const expectedLabels = ['Used Capacity', 'Warning Threshold', 'Error Threshold', 'Total Capacity', 'Current State'];
          const expectedForecasts = [null, '1 Month 3 Days' || '1 month 4 days', '2 Months 8 Days', '3 Months 7 Days', null];
          for (let i = 0; i < expectedBoxes.length; i++) {
            expect(infoBar.infoBox(expectedBoxes[i]).el.isDisplayed()).to.eventually.be.true;
            expect(infoBar.infoBox(expectedBoxes[i]).title.getText()).to.eventually.equal(expectedLabels[i]);
            if (expectedForecasts[i]) {
              expect(infoBar.infoBox(expectedBoxes[i]).el.element(by.css('.forecast')).getText()).to.eventually.equal(expectedForecasts[i]);
            }
          }
        })

        it('metadata capacity info bar', function() {
          const infoBar = capacityPage.infoBars.metadataCapacity;
          
          capacitySyncGraphs.graphSelectorPanel.graphSelection('metadata-capacity').el.click();
          expect(capacitySyncGraphs.graphSelectorPanel.graphSelection('metadata-capacity').el.getAttribute('class')).to.eventually.contain('active');
          expect(infoBar.el.isDisplayed()).to.eventually.be.true;
          expect(capacityPage.infoBars.blockCapacity.el.isPresent()).to.eventually.be.false;

          expect(infoBar.infoBoxes.count()).to.eventually.equal(3);
          const expectedBoxes = ['used-capacity', 'total-capacity', 'current-state'];
          const expectedLabels = ['Used Capacity', 'Total Capacity', 'Current State'];
          const expectedForecasts = [null, 'No growth trend on cluster', null];
          for (let i = 0; i < expectedBoxes.length; i++) {
            expect(infoBar.infoBox(expectedBoxes[i]).el.isDisplayed()).to.eventually.be.true;
            expect(infoBar.infoBox(expectedBoxes[i]).title.getText()).to.eventually.equal(expectedLabels[i]);
            if (expectedForecasts[i]) {
              expect(infoBar.infoBox(expectedBoxes[i]).el.element(by.css('.forecast')).getText()).to.eventually.equal(expectedForecasts[i]);
            }
          }
        });

        it('neither the metadata nor capacity info bars', function() {
          capacitySyncGraphs.graphSelectorPanel.graphSelection('provisioned-space').el.click();
          expect(capacitySyncGraphs.graphSelectorPanel.graphSelection('provisioned-space').el.getAttribute('class')).to.eventually.contain('active');
          expect(capacityPage.infoBars.blockCapacity.el.isPresent()).to.eventually.be.false;
          expect(capacityPage.infoBars.metadataCapacity.el.isPresent()).to.eventually.be.false;
        });

      });
    });


    describe('selecting a graph', function () {
      it('@any @smoke should change the context graph and the selected graph (including its title, expected lines, a legend (if applicable), and an export button)', function () {
        var previousGraph = graphs[graphKeys[0]];

        expect(capacitySyncGraphs.graphSelectorPanel.graphSelection(previousGraph.id).el.getAttribute('class')).to.eventually.contain('active');
        expect(capacitySyncGraphs.selectedGraph.graph(previousGraph.id).el.isPresent()).to.eventually.be.true;
        expect(capacitySyncGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.contain(previousGraph.id);
        checkSelectedGraphElements(previousGraph);

        for (var i = 1; i < graphKeys.length; i++) {
          var graph = graphs[graphKeys[i]];
          capacitySyncGraphs.graphSelectorPanel.graphSelection(graph.id).el.click();
          isSelectedAndContextGraphUpdated(graph);
          checkSelectedGraphElements(graph);
          previousGraph = graph;
        }

        function isSelectedAndContextGraphUpdated(graph) {
          expect(capacitySyncGraphs.graphSelectorPanel.graphSelection(previousGraph.id).el.getAttribute('class')).to.eventually.not.contain('active');
          expect(capacitySyncGraphs.graphSelectorPanel.graphSelection(graph.id).el.getAttribute('class')).to.eventually.contain('active');
          expect(capacitySyncGraphs.selectedGraph.graph(previousGraph.id).el.isPresent()).to.eventually.be.false;
          expect(capacitySyncGraphs.selectedGraph.graph(graph.id).el.isPresent()).to.eventually.be.true;
          expect(capacitySyncGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.contain(graph.id);
          expect(capacitySyncGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.not.contain(previousGraph.id);
        }

        function checkSelectedGraphElements(graph) {
          expect(capacitySyncGraphs.selectedGraph.graph(graph.id).title.getText()).to.eventually.equal(graph.label);
          expect(capacitySyncGraphs.selectedGraph.graph(graph.id).exportButton.isPresent()).to.eventually.be.true;

          expect(capacitySyncGraphs.selectedGraph.graph(graph.id).svg.lines.count()).to.eventually.equal(graph.seriesIds.length);
          for (var i = 0; i < graph.seriesIds.length; i++) {
            expect(capacitySyncGraphs.selectedGraph.graph(graph.id).svg.line(graph.seriesIds[i]).isDisplayed()).to.eventually.be.true;
            if (graph.seriesLabels) {
              expect(capacitySyncGraphs.selectedGraph.graph(graph.id).legend.legendItem(graph.seriesIds[i]).label.getText()).to.eventually.equal(graph.seriesLabels[i]);
            }
          }
        }
      });
    });
  });

});
