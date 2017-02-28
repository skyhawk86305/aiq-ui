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

    describe('The info-boxes with data values should have correct data, and should be wider than their data values', function() {
      it('volume size info-box', function () {
        var box = volumeDetailsPage.infoBar.infoBox('volume-size');
        expect(box.value.getText()).to.eventually.equal('10MB');
        support.infoBoxSizeCheck(volumeDetailsPage.infoBar, 'volume-size');
      })

      it('average throughput info-box', function () {
        var box = volumeDetailsPage.infoBar.infoBox('average-throughput');
        expect(box.value.getText()).to.eventually.equal('5TB/s');
        support.infoBoxSizeCheck(volumeDetailsPage.infoBar, 'average-throughput');
      });

      it('average latency info-box', function () {
        var box = volumeDetailsPage.infoBar.infoBox('average-latency');
        expect(box.value.getText()).to.eventually.equal('5.1');
        support.infoBoxSizeCheck(volumeDetailsPage.infoBar, 'average-latency');
      });

    });

    describe('the info details section', function () {
      var infoDetails;

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
        var detailBoxes = ['access', 'access-groups', 'non-zero-blocks', 'zero-blocks', 'snapshots',
          'enable512e', 'min-iops', 'max-iops', 'burst-iops', 'volumes-paired', 'create-time', 'block-size',
          'unaligned-writes', 'unaligned-reads', 'iqn', 'scsiEUIDeviceID', 'scsiNAADeviceID', 'attributes'];
        var boxTitles = ['Acces', 'Access Groups', 'Non-Zero Blocks', 'Zero Blocks', 'Snapshot Count',
          'Enable 512e', 'Min IOPS', 'Max IOPS', 'Burst IOPS', 'Volumes Paired', 'Create Time', 'Block Size',
          'Unaligned Writes', 'Unaligned Reads', 'IQN', 'scsiEUIDeviceID', 'scsiNAADeviceID', 'Attributes'];
        for (var i=0; i < detailBoxes.length; i++) {
          var box = infoDetails.infoDetailsBox(detailBoxes[i]);
          expect(box.el.isDisplayed()).to.eventually.be.true;
          expect(box.title.getText()).to.eventually.equal(boxTitles[i]);
        }
      });

      describe('it should have the correct data in the details section', function() {
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

  describe('the sync graphs', function() {
    it('@any @smoke should have 6 sparklines with the expected labels', function () {
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

    it('@any @smoke should allow the user to select a sparkline and see the selected graph with a title, expected lines, a legend (if applicable), and an export button', function () {
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
  });

});
