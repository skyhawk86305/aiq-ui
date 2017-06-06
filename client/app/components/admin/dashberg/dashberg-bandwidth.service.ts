export class DashbergBandwidthService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getData() {
    return this.DataService.callAPI('DashbergBandwidth', {});
  }
}
