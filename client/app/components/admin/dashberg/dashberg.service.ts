export class DashbergService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getPerformanceData(customerID: number) {
    return this.DataService.callDashbergAPI(customerID, 'performance');
  }

  getCustomerInfo() {
    return this.DataService.callAPI('ListCustomers');
  }
}
