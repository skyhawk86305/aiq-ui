export class DashbergVolumeAccessService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getData() {
    return this.DataService.callAPI('DashbergVolumeAccess', {});
  }
}
