export class DashbergVolumeSizeService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getData() {
    return this.DataService.callAPI('DashbergVolumeSize', {});
  }
}
