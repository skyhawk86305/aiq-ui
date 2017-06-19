export class DashbergService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  private customerID = null;

  getPerformData() {
    return this.DataService.callPerformAPI(this.customerID, 'Performance');
  }

  updateID(selectedID) {
    this.customerID = selectedID;
  }
}
