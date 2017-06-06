export class DashbergIOPService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getData() {
    return this.DataService.callAPI('DashbergIOP', {});
  }
}
