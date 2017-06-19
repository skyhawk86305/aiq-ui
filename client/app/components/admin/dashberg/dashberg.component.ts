class DashbergController {
  private customers = [];
  public selectedCustomerID = 'Customer Name';
  public selectedID = null;
  private performData = null;

  static $inject = [
    'DashbergService'
  ];

  constructor(
    private DashbergService
  ) {}

  $onInit() {
    this.getCustomers();
    this.getPerformData();
  }

  getCustomers() {
    this.customers = [
      {'name': 'Sara', id: 123},
      {'name': 'Alex', id: 456}
    ]
  }

  getPerformData() {
    return this.DashbergService.getPerformData()
      .then( response => {
        this.performData = response;
      })
  }

  updateID() {
    if (this.selectedCustomerID === 'Customer Name') this.selectedID =  null;
    else this.selectedID = parseInt(this.selectedCustomerID, 10);
    this.DashbergService.updateID(this.selectedID);
    this.getPerformData();
  }
}

export const DashbergComponent = {
  template: require('./dashberg.tpl.html'),
  controller: DashbergController
};
