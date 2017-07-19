class DashbergController {
  private customers = [];
  public selectedCustomerID: number = null;
  private performanceData = null;

  static $inject = [
    'DashbergService'
  ];

  constructor(
    private DashbergService
  ) {}

  $onInit() {
    this.getCustomers();
    this.getPerformanceData();
  }

  getCustomers() {
    return this.DashbergService.getCustomerInfo()
      .then( ({ customers = [] }) => {
        this.customers = customers.map( customer => ({
          id: customer.customerID,
          name: customer.customerName,
        }));
      });
  }

  getPerformanceData() {
    return this.DashbergService.getPerformanceData(this.selectedCustomerID)
      .then( response => {
        this.performanceData = response;
      })
  }

  updateID() {
    this.getPerformanceData();
  }
}

export const DashbergComponent = {
  template: require('./dashberg.tpl.html'),
  controller: DashbergController
};
