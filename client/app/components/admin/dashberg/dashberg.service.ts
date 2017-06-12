export class DashbergService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getBandwidthData() {
    return this.DataService.callAPI('DashbergBandwidth', {});
  }

  getVolumeData() {
    return this.DataService.callAPI('DashbergVolume', {});
  }

  getIOPData() {
    return this.DataService.callAPI('DashbergIOP', {});
  }

  getNodeData() {
    return this.DataService.callAPI('DashbergNode', {});
  }

  getSessionData() {
    return this.DataService.callAPI('DashbergSession', {});
  }

  getSnapshotData() {
    return this.DataService.callAPI('DashbergSnapshot', {});
  }

  getVolumeAccessData() {
    return this.DataService.callAPI('DashbergVolumeAccess', {});
  }

  getVolumeSizeData() {
    return this.DataService.callAPI('DashbergVolumeSize', {});
  }
}
