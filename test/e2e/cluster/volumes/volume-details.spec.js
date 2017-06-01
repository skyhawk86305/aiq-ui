'use strict';

var support = require('../../support.js');
var expect = support.expect;
var VolumeDetailsComponent = require('../../page-objects/cluster/volume-details.po');
var volumeDetailsPage = new VolumeDetailsComponent();
var clusterSelect = new support.clusterSelectComponent();
var clusterId;
var volumeId = 1;

describe('Volume Details Page', function () {
  beforeAll(function(done) {
    support.login();
    var openedClusterSelect = clusterSelect.open();
    support.getFirstClusterId(openedClusterSelect).then(function(firstClusterId) {
      clusterId = firstClusterId;
      done();
    });
  });

  beforeEach(function(done) {
    browser.get('#/cluster/' + clusterId + '/volume/' + volumeId).then(done);
  });

  afterAll(function() {
    support.logout();
  });

  it('should have a page title with the cluster name and the volume id', function() {
    expect(volumeDetailsPage.label.getText()).to.eventually.equal('cm-solidfire > Volume ID: 1');
  });

  describe('the infobar', function() {
    var infoBoxTypes = ['account-id', 'volume-size', 'used-capacity','average-iops', 'average-throughput', 'average-latency'];
    var infoBoxTitles = ['Account ID', 'Volume Size', 'Used Capacity', 'Average IOPS', 'Average Throughput', 'Average Latency (µs)'];

    it('@any @smoke should display the infobar with 6 infoboxes', function() {
      expect(volumeDetailsPage.infoBar.el.isPresent()).to.eventually.be.true;
      expect(volumeDetailsPage.infoBar.infoBoxes.count()).to.eventually.equal(6);
    });

    it('@any should display the infobar with a timestamp bar that contains the time and a refresh button', function() {
      expect(volumeDetailsPage.infoBar.timestamp.el.isPresent()).to.eventually.be.true;
      expect(volumeDetailsPage.infoBar.timestamp.timestampText.isPresent()).to.eventually.be.true;
      expect(volumeDetailsPage.infoBar.timestamp.refreshButton.isPresent()).to.eventually.be.true;
    });

    it('@any @smoke should have the correct info-boxes with the correct titles', function() {
      for (var i = 0; i < infoBoxTypes.length; i++) {
        var box = volumeDetailsPage.infoBar.infoBox(infoBoxTypes[i]);
        expect(box.el.isDisplayed()).to.eventually.be.true;
        expect(box.title.getText()).to.eventually.equal(infoBoxTitles[i]);
      }
    });

    describe('The info-boxes should be wider than their data values', function() {
      it('volume size info-box', function () {
        var box = volumeDetailsPage.infoBar.infoBox('volume-size');
        expect(box.value.getText()).to.eventually.equal('10 MB');
        support.infoBoxSizeCheck(volumeDetailsPage.infoBar, 'volume-size');
      })

      it('average throughput info-box', function () {
        var box = volumeDetailsPage.infoBar.infoBox('average-throughput');
        support.infoBoxSizeCheck(volumeDetailsPage.infoBar, 'average-throughput');
      });

      it('average latency info-box', function () {
        var box = volumeDetailsPage.infoBar.infoBox('average-latency');
        support.infoBoxSizeCheck(volumeDetailsPage.infoBar, 'average-latency');
      });
    });

    describe('the info details section', function () {
      var infoDetails,
        detailBoxes = ['access', 'access-groups', 'non-zero-blocks', 'zero-blocks', 'snapshots',
          'enable-512e', 'min-iops', 'max-iops', 'burst-iops', 'volumes-paired', 'create-time', 'block-size',
          'unaligned-writes', 'unaligned-reads', 'iqn', 'scsiEUIDeviceID', 'scsiNAADeviceID', 'attributes'],
        boxTitles = ['Access', 'Access Groups', 'Non-Zero Blocks', 'Zero Blocks', 'Snapshot Count',
          '512e Enabled', 'Min IOPS', 'Max IOPS', 'Burst IOPS', 'Volumes Paired', 'Create Time', 'Block Size',
          'Unaligned Writes', 'Unaligned Reads', 'IQN', 'scsiEUIDeviceID', 'scsiNAADeviceID', 'Attributes'],
        boxData = [ 'Read / Write', '1, 2, 3', '646', '122069882', '3', 'Yes', '1000', '15000', '15000', 'No',
          '2014-12-02 12:52:37', '4096', '0', '0', 'iqn.2010-01.com.solidfire:ddjt.staging-mango-data-01.31',
          '64646a7400123301ff47acc0100000000', '6f47acc100056600064646a740000001f', '-'];

      beforeEach(function () {
        infoDetails = volumeDetailsPage.infoBar.infoDetails;
        infoDetails.click();
      });

      afterEach(function () {
        infoDetails.click();
      });

      it('@any @smoke should have a details section in the info bar', function () {
        expect(infoDetails.el.isDisplayed()).to.eventually.be.true;
      });

      it('@any @smoke should have the correct items in the details section', function () {
        expect(infoDetails.infoDetailsBoxes.count()).to.eventually.equal(18);
        for (var i=0; i < detailBoxes.length; i++) {
          var box = infoDetails.infoDetailsBox(detailBoxes[i]);
          expect(box.el.isDisplayed()).to.eventually.be.true;
          expect(box.title.getText()).to.eventually.equal(boxTitles[i]);
        }
      });

      it('should have the correct data in the details section', function() {
        function checkData(boxId, expectedText) {
          var box = infoDetails.infoDetailsBox(boxId);
          expect(box.value.getText()).to.eventually.equal(expectedText);
        }

        for (var i = 0; i < detailBoxes.length; i++) {
          checkData(detailBoxes[i], boxData[i]);
        }
      })
    });
  });

  describe('the sync graphs', function() {
    var graphs = {
      throughput: {
        id: 'throughput',
        label: 'Throughput',
        seriesIds: ['readBytesPerSec', 'writeBytesPerSec', 'totalBytesPerSec'],
        seriesLabels: ['Read', 'Write', 'Total']
      },
      iops: {
        id: 'iops',
        label: 'IOPS',
        seriesIds: ['readOpsPerSec', 'writeOpsPerSec', 'totalOpsPerSec'],
        seriesLabels: ['Read', 'Write', 'Total']
      },
      latency: {
        id: 'latency',
        label: 'Latency',
        seriesIds: ['readLatencyUSec', 'writeLatencyUSec', 'latencyUSec'],
        seriesLabels: ['Read', 'Write', 'Average']
      },
      queueDepth: {
        id: 'queue-depth',
        label: 'Queue Depth',
        seriesIds: ['clientQueueDepth']
      },
      averageIOSize: {
        id: 'average-io-size',
        label: 'Average IO Size',
        seriesIds: ['averageIOPSize']
      },
      capacity: {
        id: 'capacity',
        label: 'Capacity',
        seriesIds: ['usedCapacity', 'provisionedCapacity'],
        seriesLabels: ['Used', 'Provisioned']
      },
    },
    graphKeys = Object.keys(graphs),
    volumeSyncGraphs = volumeDetailsPage.syncGraphs;

    it('@any @smoke should have 6 graph selections with the expected labels', function () {
      expect(volumeSyncGraphs.graphSelectorPanel.graphSelections.count()).to.eventually.equal(graphKeys.length);
      for (var i = 0; i < graphKeys.length; i++) {
        var graph = graphs[graphKeys[i]];
        expect(volumeSyncGraphs.graphSelectorPanel.graphSelection(graph.id).label.getText()).to.eventually.equal(graph.label);
        expect(volumeSyncGraphs.graphSelectorPanel.graphSelection(graph.id).sparkline.el.isPresent()).to.eventually.be.true;
      }
    });

    describe('selecting a graph', function() {
      it('@any @smoke should change the context graph and the selected graph (including its title, expected lines, a legend (if applicable), and an export button)', function () {
        var previousGraph = graphs[graphKeys[0]];

        expect(volumeSyncGraphs.graphSelectorPanel.graphSelection(previousGraph.id).el.getAttribute('class')).to.eventually.contain('active');
        expect(volumeSyncGraphs.selectedGraph.graph(previousGraph.id).el.isPresent()).to.eventually.be.true;
        expect(volumeSyncGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.contain(previousGraph.id);

        for (var i = 1; i < graphKeys.length; i++) {
          var graph = graphs[graphKeys[i]];
          volumeSyncGraphs.graphSelectorPanel.graphSelection(graph.id).el.click();
          isSelectedAndContextGraphUpdated(graph);
          checkSelectedGraphElements(graph);
          previousGraph = graph;
        }

        function isSelectedAndContextGraphUpdated(graph) {
          expect(volumeSyncGraphs.graphSelectorPanel.graphSelection(previousGraph.id).el.getAttribute('class')).to.eventually.not.contain('active');
          expect(volumeSyncGraphs.graphSelectorPanel.graphSelection(graph.id).el.getAttribute('class')).to.eventually.contain('active');
          expect(volumeSyncGraphs.selectedGraph.graph(previousGraph.id).el.isPresent()).to.eventually.be.false;
          expect(volumeSyncGraphs.selectedGraph.graph(graph.id).el.isPresent()).to.eventually.be.true;
          expect(volumeSyncGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.contain(graph.id);
          expect(volumeSyncGraphs.contextGraph.el.element(by.css('.sf-graph-time-series-container')).getAttribute('id')).to.eventually.not.contain(previousGraph.id);
        }

        function checkSelectedGraphElements(graph) {
          expect(volumeSyncGraphs.selectedGraph.graph(graph.id).title.getText()).to.eventually.equal(graph.label);
          expect(volumeSyncGraphs.selectedGraph.graph(graph.id).exportButton.isPresent()).to.eventually.be.true;

          expect(volumeSyncGraphs.selectedGraph.graph(graph.id).svg.lines.count()).to.eventually.equal(graph.seriesIds.length);
          for (var i = 0; i < graph.seriesIds.length; i++) {
            expect(volumeSyncGraphs.selectedGraph.graph(graph.id).svg.line(graph.seriesIds[i]).isDisplayed()).to.eventually.be.true;
            if (graph.seriesLabels) {
              expect(volumeSyncGraphs.selectedGraph.graph(graph.id).legend.legendItem(graph.seriesIds[i]).label.getText()).to.eventually.equal(graph.seriesLabels[i]);
            }
          }
        }
      });
    });
  });

});
