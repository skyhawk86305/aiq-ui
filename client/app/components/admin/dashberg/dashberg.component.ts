class DashbergController {
  private nodeData = null;
  private volumeData = null;
  private volumeSizeData = null;
  private volumeAccessData = null;
  private IOPData = null;
  private bandwidthData = null;
  private sessionData = null;
  private snapshotData = null;

  static $inject = [
    'DashbergService'
  ];

  constructor(
    private DashbergService
    ) {}

    $onInit() {
      this.getNodeData();
      this.getVolumeData();
      this.getVolumeSizeData();
      this.getVolumeAccessData();
      this.getSessionData();
      this.getIOPData();
      this.getSnapshotData();
      this.getBandwidthData();
    }

    getNodeData() {
      return this.DashbergService.getNodeData()
        .then( response => {
          this.nodeData = response;
        })
    }

    getVolumeData() {
      return this.DashbergService.getVolumeData()
        .then( response => {
          this.volumeData = response;
        })
    }

    getVolumeSizeData() {
      return this.DashbergService.getVolumeSizeData()
        .then( response => {
          this.volumeSizeData = response;
        })
    }

    getVolumeAccessData() {
      return this.DashbergService.getVolumeAccessData()
        .then( response => {
          this.volumeAccessData = response;
        })
    }

    getIOPData() {
      return this.DashbergService.getIOPData()
        .then( response => {
          this.IOPData = response;
        })
    }

    getBandwidthData() {
      return this.DashbergService.getBandwidthData()
        .then( response => {
          this.bandwidthData = response;
        })
    }

    getSessionData() {
      return this.DashbergService.getSessionData()
        .then( response => {
          this.sessionData = response;
        })
    }

    getSnapshotData() {
      return this.DashbergService.getSnapshotData()
        .then( response => {
          this.snapshotData = response;
        })
    }
}

export const DashbergComponent = {
  template: require('./dashberg.tpl.html'),
  controller: DashbergController
};
