// 'use strict';

// describe('Component: performanceGraphs', function() {
//   var scope,
//     routeParams,
//     controller,
//     deferred,
//     locals,
//     filter,
//     performanceService;


//   beforeEach(module('aiqUi', function ($provide) {
//     $provide.value('SFD3LineGraph', function () {});
//     $provide.value('SFD3BarGraph', function () {});
//   }));
//   beforeEach(module('componentTemplates'));

//   beforeEach(inject(function($rootScope, $q, $filter, $componentController, $routeParams, PerformanceGraphsService) {
//     scope = $rootScope;
//     deferred = $q.defer();
//     routeParams = $routeParams;
//     routeParams.clusterID = '1';
//     performanceService = PerformanceGraphsService;
//     filter = $filter;
//     locals = {
//       $routeParams: routeParams,
//       $filter: filter,
//       PerformanceGraphsService: performanceService
//     };
//     spyOn(performanceService, 'update');
//     controller = $componentController('performanceGraphs', locals);
//   }));

//   describe('initialization', function () {
//     it('should expose date range options and sync graphs', function () {
//       expect(controller.staticDateRangeOptions).toBeDefined();
//       expect(controller.syncGraphs).toBeDefined();
//     });
//   });

//   describe('.$onInit', function() {
//     it('should update the performance graphs service with the clusterID from the route', function() {
//       controller.$onInit();
//       expect(performanceService.update).toHaveBeenCalledWith(routeParams.clusterID);
//     });
//   });

// });
