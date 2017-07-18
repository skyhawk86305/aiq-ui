export class DashbergService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getPerformanceData(customerID: number) {
    return this.DataService.callDashbergAPI(customerID, 'performance');
  }

  getMetadata(customerID: number) {
    return this.DataService.callDashbergAPI(customerID, 'metadata');
  }

  getCustomerInfo() {
    return this.DataService.callAPI('ListCustomers');
  }
}
