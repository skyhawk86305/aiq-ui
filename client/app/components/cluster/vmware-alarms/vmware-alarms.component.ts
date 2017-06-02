class VmwareAlarmsController {
  public service;

  static $inject = [ '$routeParams', 'VmwareAlarmsService' ];
  constructor(private $routeParams, private VmwareAlarmsService) {
    this.service = this.VmwareAlarmsService;
    this.service.update($routeParams.clusterID);
  }
}

export const VmwareAlarmsComponent = {
  template: require('./vmware-alarms.tpl.html'),
  controller: VmwareAlarmsController,
};
