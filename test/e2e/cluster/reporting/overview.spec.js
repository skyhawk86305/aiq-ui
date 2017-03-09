'use strict';

var support = require('../../support.js');
var expect = support.expect;
var ClusterOverviewComponent = require('../../page-objects/cluster/reporting/overview.po');
var clusterOverviewPage = new ClusterOverviewComponent();
var clusterSelect = new support.clusterSelectComponent();
var clusterId;

describe('Cluster Overview Page', function () {
  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/reporting/overview').then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('@any @smoke should have the performance graph with the correct title, series and legend items', function () {
    var graph = clusterOverviewPage.graphs.clusterPerformance;
    expect(graph.el.isDisplayed()).to.eventually.be.true;
    expect(graph.title.getText()).to.eventually.equal('Performance');

    expect(graph.svg.lines.count()).to.eventually.equal(2);
    var expectedSeries = ['totalOpsPerSec','totalBytesPerSec'],
      expectedLabels = ['IOPS','Throughput'];
    for (var i=0; i < expectedSeries.length; i++) {
      expect(graph.svg.line(expectedSeries[i]).isDisplayed()).to.eventually.be.true;
      expect(graph.legend.legendItem(expectedSeries[i]).label.getText()).to.eventually.equal(expectedLabels[i]);
    }
  });

  it('@any have an export button for the Performance Graph', function() {
    expect(clusterOverviewPage.graphs.clusterPerformance.exportButton.isDisplayed()).to.eventually.be.true;
  });

  it('@any @smoke should have the utilization graph with the correct title, series and legend items', function () {
    var graph = clusterOverviewPage.graphs.performanceUtilization;
    expect(graph.el.isDisplayed()).to.eventually.be.true;
    expect(graph.title.getText()).to.eventually.equal('Utilization');
    expect(graph.svg.lines.count()).to.eventually.equal(1);
    expect(graph.svg.line('clusterUtilizationPct').isDisplayed()).to.eventually.be.true;
    expect(graph.legend.legendItem('clusterUtilizationPct').label.getText()).to.eventually.equal('Utilization');

  });

  it('@any should have an export button for the Utilization Graph', function() {
    expect(clusterOverviewPage.graphs.performanceUtilization.exportButton.isDisplayed()).to.eventually.be.true;
  });

  describe('the infobar', function() {
    var infoBoxTypes = ['node-count', 'volume-count', 'block-capacity','metadata-capacity',
      'efficiency-info', 'cluster-faults'];
    var infoBoxTitles = ['Nodes','Volumes','Block Capacity','Metadata Capacity',
      'Efficiency (x)','Unresolved Faults'];

    it('@any @smoke should display the infobar with 6 infoboxes', function() {
      expect(clusterOverviewPage.infoBar.el.isPresent()).to.eventually.be.true;
      expect(clusterOverviewPage.infoBar.infoBoxes.count()).to.eventually.equal(6);
    });

    it('@any should display the infobar with a timestamp bar that contains the time and a refresh button', function() {
      expect(clusterOverviewPage.infoBar.timestamp.el.isPresent()).to.eventually.be.true;
      expect(clusterOverviewPage.infoBar.timestamp.timestampText.isPresent()).to.eventually.be.true;
      expect(clusterOverviewPage.infoBar.timestamp.refreshButton.isPresent()).to.eventually.be.true;
    });

    it('@any @smoke should have the correct info-boxes with the correct titles', function() {
      for (var i = 0; i < infoBoxTypes.length; i++) {
        var box = clusterOverviewPage.infoBar.infoBox(infoBoxTypes[i]);
        expect(box.el.isDisplayed()).to.eventually.be.true;
        expect(box.title.getText()).to.eventually.equal(infoBoxTitles[i]);
      }
    });

    describe('The info-boxes with data values should have correct data, and should be wider than their data values', function() {
      it('node count info-box', function () {
        var box = clusterOverviewPage.infoBar.infoBox('node-count');
        expect(box.value.getText()).to.eventually.equal('10');
        support.infoBoxSizeCheck(clusterOverviewPage.infoBar, 'node-count');
      })

      it('volume-count info-box', function () {
        var box = clusterOverviewPage.infoBar.infoBox('volume-count');
        expect(box.value.getText()).to.eventually.equal('11');
        support.infoBoxSizeCheck(clusterOverviewPage.infoBar, 'volume-count');
      });

      it('efficiency info-box', function () {
        var box = clusterOverviewPage.infoBar.infoBox('efficiency-info');
        expect(box.value.getText()).to.eventually.equal('25.3');
        support.infoBoxSizeCheck(clusterOverviewPage.infoBar, 'efficiency-info');
      });

    });

    describe('The info-boxes with badges values should have correct badges and data', function() {
      it('block capacity info-box and its status badge', function () {
        var box = clusterOverviewPage.infoBar.infoBox('block-capacity');
        expect(box.badge('no-alert').el.isDisplayed()).to.eventually.be.true;
        expect(box.badge('no-alert').title.getText()).to.eventually.equal('Normal');
      });

      it('metadata capacity info-box and its status badge', function () {
        var box = clusterOverviewPage.infoBar.infoBox('metadata-capacity');
        expect(box.badge('warning').el.isDisplayed()).to.eventually.be.true;
        expect(box.badge('warning').title.getText()).to.eventually.equal('Warning');
      });

      it('cluster fault info-box and its unresolved warning and error badges', function () {
        var box = clusterOverviewPage.infoBar.infoBox('cluster-faults');
        expect(box.badge('first.-warning').el.isDisplayed()).to.eventually.be.true;
        expect(box.badge('first.-warning').value.getText()).to.eventually.equal('3');
        expect(box.badge('second.-critical').el.isDisplayed()).to.eventually.be.true;
        expect(box.badge('second.-critical').value.getText()).to.eventually.equal('2');
      });
    });

    describe('infobox title links when clicked', function() {
      it('@any @smoke node count should redirect to the nodes page', function() {
        const box = clusterOverviewPage.infoBar.infoBox('node-count');
        box.title.click();
        expect(browser.getLocationAbsUrl()).to.eventually.include('/nodes');
      });

      it('@any @smoke volume count should redirect to the volumes page', function() {
        const box = clusterOverviewPage.infoBar.infoBox('volume-count');
        box.title.click();
        expect(browser.getLocationAbsUrl()).to.eventually.include('/volumes');
      });

      it('@any @smoke efficiency info should redirect to the efficiency page', function() {
        const box = clusterOverviewPage.infoBar.infoBox('efficiency-info');
        box.title.click();
        expect(browser.getLocationAbsUrl()).to.eventually.include('/efficiency');
      });

      it('@any @smoke block capacity should redirect to the capacity page', function() {
        const box = clusterOverviewPage.infoBar.infoBox('block-capacity');
        box.title.click();
        expect(browser.getLocationAbsUrl()).to.eventually.include('/capacity?capacity-sync-graphs-context-graph=block-capacity');
      });

      it('@any @smoke metadata capacity should redirect to the capacity page', function() {
        const box = clusterOverviewPage.infoBar.infoBox('metadata-capacity');
        box.title.click();
        expect(browser.getLocationAbsUrl()).to.eventually.include('/capacity?capacity-sync-graphs-context-graph=metadata-capacity');
      });

      it('@any @smoke cluster faults should redirect to the error log page', function() {
        const box = clusterOverviewPage.infoBar.infoBox('cluster-faults');
        box.title.click();
        expect(browser.getLocationAbsUrl()).to.eventually.include('/errorLog');
      });
    });

    describe('the details section', function () {

      var infoDetails;

      beforeEach(function () {
        infoDetails = clusterOverviewPage.infoBar.infoDetails;
        infoDetails.click();
      });

      afterEach(function () {
        infoDetails.click();
      });

      it('@any @smoke should have a details section in the info bar', function () {
        expect(infoDetails.el.isDisplayed()).to.eventually.be.true;
      });

      it('@any @smoke should have the correct items in the details section', function () {
        expect(infoDetails.infoDetailsBoxes.count()).to.eventually.equal(4);
        var detailBoxes = ['elementos-version','iscsi-sessions', 'encryption-at-rest','node-types'];
        var boxTitles = ['Element OS Version','iSCSI Sessions','Encryption at Rest','Node Types'];
        for (var i=0; i < detailBoxes.length; i++) {
          var box = infoDetails.infoDetailsBox(detailBoxes[i]);
          expect(box.el.isDisplayed()).to.eventually.be.true;
          expect(box.title.getText()).to.eventually.equal(boxTitles[i]);
        }
      });

      describe('it should have the correct data in the detail section', function() {
        it('the Element OS version', function () {
          var box = infoDetails.infoDetailsBox('elementos-version');
          expect(box.value.getText()).to.eventually.equal('8.1.0.95');
        });

        it('the iSCSCI Sessions count', function () {
          var box = infoDetails.infoDetailsBox('iscsi-sessions');
          expect(box.value.getText()).to.eventually.equal('9');
        });

        it('the Encryption at Rest state', function () {
          var box = infoDetails.infoDetailsBox('encryption-at-rest');
          expect(box.value.getText()).to.eventually.equal('DISABLED');
        });

        it('the node types count', function () {
          var box = infoDetails.infoDetailsBox('node-types');
          expect(box.value.getText()).to.eventually.equal('1 - SF-A044, 8 - SF9605, 1 - SF9610');
        });
      })
    });
  });

});
