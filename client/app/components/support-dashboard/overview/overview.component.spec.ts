'use strict';

describe('Component: SupportDashboardOverviewComponent', function() {
  let controller,
    $componentController;

  beforeEach(angular.mock.module('aiqUi'));

  beforeEach(inject(function(_$componentController_) {
    $componentController = _$componentController_;
    const bindings = {
      editAuthorization: false,
    };
    controller = _$componentController_('supportOverview', null, bindings);
  }));

  describe('initialization', function() {
    it('should expose the table service to be used in the sf-table component', function() {
      expect(controller.service).toBeDefined();
    });

    it('should have the correct number of columns when not authorized for triaging alerts', function() {
      expect(controller.columns.length).toEqual(11);
    });

    it('should have the correct number of columns when authorized for triaging alerts', function() {
      const bindings = {
        editAuthorization: true,
      };
      controller = $componentController('supportOverview', null, bindings);
      expect(controller.columns.length).toEqual(13);
    });
  });

  describe('.getAlerts', function() {
    it('should deserialize the responses and resolve an array of data', function() {
      // TODO: Add in checker once we hit an actual API.
    });
  });

  describe('.getSelectedRows', function() {
    it('should set the correct rows in the controller', function() {
      controller.getSelectedRows([]);
      expect(controller.selectedRows).toEqual([]);
      controller.getSelectedRows([1, 2, 3]);
      expect(controller.selectedRows).toEqual([1, 2, 3]);
    });
  });

});
