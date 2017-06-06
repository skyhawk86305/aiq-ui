export class DashbergSnapshotService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getData() {
    return this.DataService.callAPI('DashbergSnapshot', {});
  }
}

