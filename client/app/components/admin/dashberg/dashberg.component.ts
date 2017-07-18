class DashbergController {
  private customers = [];
  public selectedCustomerID: number = null;
  private performanceData = null;
  private metadata = null;
  private nodeType = [];

  static $inject = [
    'DashbergService'
  ];

  constructor(
    private DashbergService
  ) {}

  $onInit() {
    this.getCustomers();
    this.getPerformanceData();
    this.getMetadata();
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
      });
  }

  getMetadata() {
    return this.DashbergService.getMetadata(this.selectedCustomerID)
      .then( response => {
        this.metadata = response.nodes;
      });
  }

  updateID() {
    this.getPerformanceData();
    this.getMetadata();
    this.nodeType = [];
  }

  showVersions(type) {
    if (type) {
      let idx = this.nodeType.indexOf(type);
      if (idx === -1) {
        this.nodeType.push(type);
      }
      else {
        this.nodeType.splice(idx,1);
      }
    }
  }

  versionInfo(type) {
    if (type && this.nodeType.indexOf(type) !== -1) return true;
    return false;
  }
}

export const DashbergComponent = {
  template: require('./dashberg.tpl.html'),
  controller: DashbergController
};
