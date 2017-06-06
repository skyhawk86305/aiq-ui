class DashbergController {
  private nodeData;
  private volumeData;
  private volumeSizeData;
  private volumeAccessData;
  private IOPData;
  private bandwidthData;
  private sessionData;
  private snapshotData;

  static $inject = [
    'DashbergNodeService',
    'DashbergVolumeService',
    'DashbergVolumeSizeService',
    'DashbergVolumeAccessService',
    'DashbergIOPService',
    'DashbergBandwidthService',
    'DashbergSessionService',
    'DashbergSnapshotService',
    '$filter'
  ];

  constructor(
    private DashbergNodeService,
    private DashbergVolumeService,
    private DashbergVolumeSizeService,
    private DashbergVolumeAccessService,
    private DashbergIOPService,
    private DashbergBandwidthService,
    private DashbergSessionService,
    private DashbergSnapshotService,
    private $filter
    ) {
    }
    $onInit() {
      this.getNodeData();
      this.getVolumeData();
      this.getVolumeSizeData();
      this.getVolumeAccessData();
      this.getIOPData();
      this.getBandwidthData();
      this.getSessionData();
      this.getSnapshotData();
    }

    getNodeData() {
      return this.DashbergNodeService.getData()
        .then( response => {
          this.nodeData = response;
          this.nodeData.stdDevCluster = this.percentFormat(this.nodeData.stdDevCluster);
          this.nodeData.stdDevNode = this.percentFormat(this.nodeData.stdDevNode);
          this.nodeData.changeRateAbs = this.percentDecFormat(Math.abs(this.nodeData.changeRate));
        })
    }

    getVolumeData() {
      return this.DashbergVolumeService.getData()
        .then( response => {
          this.volumeData = response;
          this.volumeData.stdDevCluster = this.percentFormat(this.volumeData.stdDevCluster);
          this.volumeData.stdDevNode = this.percentFormat(this.volumeData.stdDevNode);
          this.volumeData.totalVolumes = this.numFormat(this.volumeData.totalVolumes);
          this.volumeData.minVolumesCluster = this.numFormat(this.volumeData.minVolumesCluster);
          this.volumeData.maxVolumesCluster = this.numFormat(this.volumeData.maxVolumesCluster);
          this.volumeData.avgVolumesCluster = this.numFormat(this.volumeData.avgVolumesCluster);
          this.volumeData.unitVolumesCluster = this.numFormat(this.volumeData.unitVolumesCluster);
          this.volumeData.minVolumesNode = this.numFormat(this.volumeData.minVolumesNode);
          this.volumeData.maxVolumesNode = this.numFormat(this.volumeData.maxVolumesNode);
          this.volumeData.unitVolumesNode = this.numFormat(this.volumeData.unitVolumesNode);
          this.volumeData.avgVolumesNode = this.numFormat(this.volumeData.avgVolumesNode);
          this.volumeData.changeRateAbs = this.percentDecFormat(Math.abs(this.volumeData.changeRate));
        })
    }

    getVolumeSizeData() {
      return this.DashbergVolumeSizeService.getData()
        .then( response => {
          this.volumeSizeData = response;
          this.volumeSizeData.stdDevCluster = this.percentFormat(this.volumeSizeData.stdDevCluster);
          this.volumeSizeData.stdDevNode = this.percentFormat(this.volumeSizeData.stdDevNode);
          this.volumeSizeData.totalVolumeSize = this.bytesFormat(this.volumeSizeData.totalVolumeSize);
          this.volumeSizeData.minVolumeSizeCluster = this.bytesFormat(this.volumeSizeData.minVolumeSizeCluster);
          this.volumeSizeData.maxVolumeSizeCluster = this.bytesFormat(this.volumeSizeData.maxVolumeSizeCluster);
          this.volumeSizeData.avgVolumeSizeCluster = this.bytesFormat(this.volumeSizeData.avgVolumeSizeCluster);
          this.volumeSizeData.unitVolumeSizeCluster = this.bytesFormat(this.volumeSizeData.unitVolumeSizeCluster);
          this.volumeSizeData.minVolumeSizeNode = this.bytesFormat(this.volumeSizeData.minVolumeSizeNode);
          this.volumeSizeData.maxVolumeSizeNode = this.bytesFormat(this.volumeSizeData.maxVolumeSizeNode);
          this.volumeSizeData.avgVolumeSizeNode = this.bytesFormat(this.volumeSizeData.avgVolumeSizeNode);
          this.volumeSizeData.unitVolumeSizeNode = this.bytesFormat(this.volumeSizeData.unitVolumeSizeNode);
          this.volumeSizeData.changeRateAbs = this.percentDecFormat(Math.abs(this.volumeSizeData.changeRate));
        })
    }

    getVolumeAccessData() {
      return this.DashbergVolumeAccessService.getData()
        .then( response => {
          this.volumeAccessData = response;
          this.volumeAccessData.stdDevCluster = this.percentFormat(this.volumeAccessData.stdDevCluster);
          this.volumeAccessData.stdDevNode = this.percentFormat(this.volumeAccessData.stdDevNode);
          this.volumeAccessData.changeRateAbs = this.percentDecFormat(Math.abs(this.volumeAccessData.changeRate));
        })
    }

    getIOPData() {
      return this.DashbergIOPService.getData()
        .then( response => {
          this.IOPData = response;
          this.IOPData.stdDevCluster = this.percentFormat(this.IOPData.stdDevCluster);
          this.IOPData.stdDevNode = this.percentFormat(this.IOPData.stdDevNode);
          this.IOPData.totalIOPs = this.numFormat(this.IOPData.totalIOPs);
          this.IOPData.minIOPsCluster = this.numFormat(this.IOPData.minIOPsCluster);
          this.IOPData.maxIOPsCluster = this.numFormat(this.IOPData.maxIOPsCluster);
          this.IOPData.avgIOPsCluster = this.numFormat(this.IOPData.avgIOPsCluster);
          this.IOPData.unitIOPsCluster = this.numFormat(this.IOPData.unitIOPsCluster);
          this.IOPData.minIOPsNode = this.numFormat(this.IOPData.minIOPsNode);
          this.IOPData.maxIOPsNode = this.numFormat(this.IOPData.maxIOPsNode);
          this.IOPData.avgIOPsNode = this.numFormat(this.IOPData.avgIOPsNode);
          this.IOPData.unitIOPsNode = this.numFormat(this.IOPData.unitIOPsNode);
          this.IOPData.changeRateAbs = this.percentDecFormat(Math.abs(this.IOPData.changeRate));
        })
    }

    getBandwidthData() {
      return this.DashbergBandwidthService.getData()
        .then( response => {
          this.bandwidthData = response;
          this.bandwidthData.stdDevCluster = this.percentFormat(this.bandwidthData.stdDevCluster);
          this.bandwidthData.stdDevNode = this.percentFormat(this.bandwidthData.stdDevNode);
          this.bandwidthData.totalBandwidth = this.bytesPerSecondFormat(this.bandwidthData.totalBandwidth);
          this.bandwidthData.minBandwidthCluster = this.bytesPerSecondFormat(this.bandwidthData.minBandwidthCluster);
          this.bandwidthData.maxBandwidthCluster = this.bytesPerSecondFormat(this.bandwidthData.maxBandwidthCluster);
          this.bandwidthData.avgBandwidthCluster = this.bytesPerSecondFormat(this.bandwidthData.avgBandwidthCluster);
          this.bandwidthData.unitBandwidthCluster = this.bytesPerSecondFormat(this.bandwidthData.unitBandwidthCluster);
          this.bandwidthData.minBandwidthNode = this.bytesPerSecondFormat(this.bandwidthData.minBandwidthNode);
          this.bandwidthData.maxBandwidthNode = this.bytesPerSecondFormat(this.bandwidthData.maxBandwidthNode);
          this.bandwidthData.avgBandwidthNode = this.bytesPerSecondFormat(this.bandwidthData.avgBandwidthNode);
          this.bandwidthData.unitBandwidthNode = this.bytesPerSecondFormat(this.bandwidthData.unitBandwidthNode);
          this.bandwidthData.changeRateAbs = this.percentDecFormat(Math.abs(this.bandwidthData.changeRate));
        })
    }

    getSessionData() {
      return this.DashbergSessionService.getData()
        .then( response => {
          this.sessionData = response;
          this.sessionData.stdDevCluster = this.percentFormat(this.sessionData.stdDevCluster);
          this.sessionData.stdDevNode = this.percentFormat(this.sessionData.stdDevNode);
          this.sessionData.changeRateAbs = this.percentDecFormat(Math.abs(this.sessionData.changeRate));
        })
    }

    getSnapshotData() {
      return this.DashbergSnapshotService.getData()
        .then( response => {
          this.snapshotData = response;
          this.snapshotData.stdDevCluster = this.percentFormat(this.snapshotData.stdDevCluster);
          this.snapshotData.stdDevVolume = this.percentFormat(this.snapshotData.stdDevVolume);
          this.snapshotData.changeRateAbs = this.percentDecFormat(Math.abs(this.snapshotData.changeRate));
        })
    }

    percentFormat(percent) {
      return this.$filter('percent')(percent, 0, true, false, false, null, null);
    }
    percentDecFormat(percentDec) {
      return this.$filter('percent')(percentDec, 1, true, false, false, null, null);
    }
    bytesFormat(bytes) {
      return this.$filter('bytes')(bytes, false, 0, false, false);
    }
    bytesPerSecondFormat(bytesPerSecond) {
      return this.$filter('bytes')(bytesPerSecond, false, 0, true, false);
    }
    numFormat(num) {
      if (num >= 1000) num = num / 1000 + 'k';
      return num;
    }

}

export const DashbergComponent = {
  template: require('./dashberg.tpl.html'),
  controller: DashbergController
};
