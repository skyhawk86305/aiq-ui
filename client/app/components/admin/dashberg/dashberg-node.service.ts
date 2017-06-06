export class DashbergNodeService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  public getData() {
    return this.DataService.callAPI('DashbergNode', {});
  }
}
