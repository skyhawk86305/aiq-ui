export class DashbergService {
  static $inject = [ 'DataService' ];
  constructor( private DataService ) {}

  getPerformanceData(customerID: number) {
    return this.DataService.callPerformanceAPI(customerID, 'Performance');
  }

  getCustomerInfo() {
    return this.DataService.callAPI('ListCustomers');
  }
}
