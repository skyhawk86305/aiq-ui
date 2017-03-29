'use strict';

const support = require('../../support.js');
const expect = require('../../support.js').expect;
const CapacityPage = require('../../page-objects/cluster/reporting/capacity.po');
const capacityPage = new CapacityPage();
const clusterSelect = new support.clusterSelectComponent();

describe('The Cluster Capacity Page', function() {
  let clusterID;

  beforeAll(function() {
    support.login();
    const openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterID = firstClusterId;
    });
  });

  beforeEach(function() {
    browser.get(`#/cluster/${clusterID}/reporting/capacity`);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should display a sync-graphs component on page load', function() {
    expect(capacityPage.syncGraphs.el.isDisplayed()).to.eventually.be.true;
  });

  it('@any should have custom static date range options', function() {
    const expectedDateRangeOptions = ['Last 24 Hours', 'Last 3 Days', 'Last 7 Days', 'Last 14 Days', 'Last 30 Days'];
    const actualDateRangeOptions = capacityPage.syncGraphs.dateRangeSelectors.static.staticDateRangeOptions;

    for (let i = 0; i < expectedDateRangeOptions.length; i++) {
      expect(actualDateRangeOptions.get(i).getText()).to.eventually.equal(expectedDateRangeOptions[i]);
    }
    expect(actualDateRangeOptions.count()).to.eventually.equal(5);
  });

  it('@any should have a default date range selected', function() {
    expect(capacityPage.syncGraphs.dateRangeSelectors.static.activeDateRangeOption.getText()).to.eventually.equal('Last 7 Days');
  });

  it('@any should have a specific graph selected as the initial context', function() {
    expect(capacityPage.syncGraphs.contextGraph.el.getAttribute('component-id')).to.eventually.equal('block-capacity-context');
  });

  it('@any @smoke should have 3 child graphs', function() {
    const childGraphIds = ['provisioned-space-child','metadata-capacity-child','block-capacity-child'];
    const childGraphTitleIds = ['provisioned-space','metadata-capacity','block-capacity'];
    const childGraphTitles = ['Provisioned Space','Metadata Capacity','Block Capacity'];

    for (let i = 0; i < childGraphIds.length; i++) {
      capacityPage.syncGraphs.graphSelector.select(childGraphTitleIds[i]);
      expect(capacityPage.syncGraphs.childGraph(childGraphIds[i]).el.isDisplayed()).to.eventually.be.true;
      expect(capacityPage.syncGraphs.childGraphTitle(childGraphTitleIds[i]).getText()).to.eventually.equal(childGraphTitles[i]);
    }
    expect(capacityPage.syncGraphs.childrenGraphs.count()).to.eventually.equal(3);
  });


  describe('Provisioned Space Graph', function() {
    it('@any @smoke should have the correct data series plotted with the appropriate legend', function() {
      const graph = capacityPage.syncGraphs.childGraph('provisioned-space-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);

      const expectedSeries = ['maxProvisionedSpace','provisionedSpace'];
      const expectedLabels = ['Max Provisioned Space','Provisioned Space'];
      for (let i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });
  });

  describe('Block Capacity Graph', function() {
    it('@any @smoke should have the correct data series plotted, with the appropriate legends', function() {
      const graph = capacityPage.syncGraphs.childGraph('block-capacity-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);

      const expectedSeries = ['maxUsedSpace','usedSpace'];
      const expectedLabels = ['Max Used Space','Used Space'];
      for (let i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });

    it('@any should have an export button for the Block Capacity Graph', function() {
      expect(capacityPage.syncGraphs.childGraph('block-capacity-child').exportButton.isDisplayed()).to.eventually.be.true;
    });

    // TODO: expectedForecasts are occasionally one day off, possibly due to a timing issue. Needs investigation
    xit('@any @smoke should have the correct info boxes displayed with the correct labels', function() {
      const infoBar = capacityPage.infoBars.blockCapacity;
      expect(infoBar.infoBoxes.count()).to.eventually.equal(5);
      const expectedBoxes = ['used-capacity','warning-threshold','error-threshold','total-capacity','current-state'];
      const expectedLabels = ['Used Capacity','Warning Threshold','Error Threshold','Total Capacity','Current State'];
      const expectedForecasts = [null, '1 Month 3 Days', '2 Months 8 Days', '3 Months 7 Days', null];
      for (let i = 0; i < expectedBoxes.length; i++) {
        expect(infoBar.infoBox(expectedBoxes[i]).el.isDisplayed()).to.eventually.be.true;
        expect(infoBar.infoBox(expectedBoxes[i]).title.getText()).to.eventually.equal(expectedLabels[i]);
        if (expectedForecasts[i]) {
          expect(infoBar.infoBox(expectedBoxes[i]).el.element(by.css('.forecast')).getText()).to.eventually.equal(expectedForecasts[i]);
        }
      }
    });

    it('@any The info-boxes must be wider than their value text', function() {
      const infoBar = capacityPage.infoBars.blockCapacity;
      const boxNames = ['used-capacity','warning-threshold','error-threshold','total-capacity','current-state'];
      for (let i=0; i < boxNames.length; i++) {
        support.infoBoxSizeCheck(infoBar, boxNames[i]);
      }
    });
  });

  describe('Metadata Capacity Graph', function() {
    it('@any @smoke should have the correct data series plotted, with the appropriate legends', function() {
      const graph = capacityPage.syncGraphs.childGraph('metadata-capacity-child');
      expect(graph.svg.lines.count()).to.eventually.equal(2);
      const expectedSeries = ['maxUsedMetadataSpace','usedMetadataSpace'];
      const expectedLabels = ['Total Capacity','Used Metadata Space'];
      for (let i = 0; i < expectedSeries.length; i++) {
        expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
        expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
      }
    });

    it('@any should have an export button for the Metadata Capacity Graph', function() {
      expect(capacityPage.syncGraphs.childGraph('metadata-capacity-child').exportButton.isDisplayed()).to.eventually.be.true;
    });

    it('@any @smoke should have the correct info boxes displayed, with the appropriate titles', function() {
      const infoBar = capacityPage.infoBars.metadataCapacity;
      expect(infoBar.infoBoxes.count()).to.eventually.equal(3);
      const expectedBoxes = ['used-capacity','total-capacity','current-state'];
      const expectedLabels = ['Used Capacity','Total Capacity','Current State'];
      const expectedForecasts = [null, 'No growth trend on cluster', null];
      for (let i = 0; i < expectedBoxes.length; i++) {
        expect(infoBar.infoBox(expectedBoxes[i]).el.isDisplayed()).to.eventually.be.true;
        expect(infoBar.infoBox(expectedBoxes[i]).title.getText()).to.eventually.equal(expectedLabels[i]);
        if (expectedForecasts[i]) {
          expect(infoBar.infoBox(expectedBoxes[i]).el.element(by.css('.forecast')).getText()).to.eventually.equal(expectedForecasts[i]);
        }
      }
    });

    it('@any The info-boxes must be wider than their value text', function() {
      const infoBar = capacityPage.infoBars.metadataCapacity;
      const boxNames = ['used-capacity','total-capacity','current-state'];
      for (let i=0; i < boxNames.length; i++) {
        support.infoBoxSizeCheck(infoBar, boxNames[i]);
      }
    });
  });
});
