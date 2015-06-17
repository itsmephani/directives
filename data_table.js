ang.directive('datatable', function($rootScope, $http, $routeParams, $location, $injector) {
	return {
		restrict: 'AE',
		scope: false,
		link: function(scope, elem, attrs) {
			var numbers = 0, i, start, adjust;
			scope.tableAttrs = {
				pageNo: 1,
				perPage: $routeParams.perPage ? $routeParams.perPage : 10,
				asc: 1
			};
			if(scope.scope[scope.feature])
				scope.tableAttrs['scope'] = scope.scope[scope.feature];
			scope.disabled = {first: true, previous: true, next: false, last: false};
			var factory = scope.factory;
			factory = $injector.get(factory);
			scope.path = $rootScope.pluralize( scope.path.substring(0, scope.path.indexOf('_')) + '/' + scope.path.substring(scope.path.indexOf('_')+1) );
			scope.ceil = window.Math.ceil;
			scope.$watch("tableAttrs", function(newValue, oldValue){
				//$location.search(scope.tableAttrs);
				if(oldValue.q != newValue.q){
					scope.tableAttrs.pageNo = 1;
				}

				factory.get(angular.extend({format: "dtable_json"}, scope.tableAttrs), function(response){
					scope.columns = response.cols;
					scope.items = response.rows;
					scope.totalRecords = response.totalRecords;
					scope.count = response.count;
					scope.perPage = response.displayRecords;
					scope.nonSortable = response.non_sortable;
					scope.from = scope.totalRecords == 0 ? 0 :  (scope.tableAttrs.perPage * ( scope.tableAttrs.pageNo-1) + 1);
					scope.to = (scope.tableAttrs.perPage > scope.totalRecords) ? (scope.from + scope.totalRecords) : scope.tableAttrs.perPage * scope.tableAttrs.pageNo;
				});
			}, true);

		}
	};
});
