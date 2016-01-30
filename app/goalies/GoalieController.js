
angular
	.module('puckalyticsMainApp.goalies', [
		'ui.router', 
		'ui.bootstrap'
	])
	.controller('GoalieController', GoalieController );

function GoalieController (
	$scope, $stateParams, goalieConstants, secretConstants,
	getParamsFromUrl, getData
) {

	var defaults = {
		setOrderByField: setOrderByField,
		orderByField : 'SvPct',
		error_message : null,
		showFilters : true,
		reverseSort : true,
		loading : false,
		hidedata : false,
	    playerdata : [],
	    filter_inputs : {},
	    active_filters : {},
	    activeFilterInputs : activeFilterInputs,
	    section_data_url : secretConstants.goalies_data_url,
	    metrics: goalieConstants.goalie_metrics_object,
		toggleTableFilters : toggleTableFilters,
		tableFilter : tableFilter,
	};

	// Actions :
	// 1. put defaults on scope
	angular.extend( $scope , defaults );
	
	// 2. get values from URL and attach to $scope 
	getParamsFromUrl.get($stateParams, $scope);

	// 3. main fn - bootstrap the controller
	init();

	// watch filter_menu directive for new data inputs
	$scope.$on('filter_menu_update', function(){
    	init();
	});

	function activeFilterInputs (value, input_field) {
		$scope.active_filters[input_field] = value;

		$scope.$broadcast('filter_inputs_changed', $scope.active_filters);
	}

    // Functions List:
	function init() {
		$scope.loading = true;
		
		getData
			.stats($scope.section_data_url, $scope.season, $scope.situation, $scope.TOIMin)
			.then(checkForErrors)
			.then(setPlayerMetricsWithResponse);

		function setPlayerMetricsWithResponse ( response ) {
			var metrics = $scope.metrics;
			var players = $scope.playerdata = response;
            console.log('metric:', metrics);

			angular.forEach( players , function(player) {
				player.checkboxFilter = false;
				
				angular.forEach( metrics , function (metric) {
					var stat = metric.metric;
					player['TOIDec'] = parseFloat(player['TOIDec']);
					player[stat] = parseFloat(player[stat]);
				});
			});
			
			$scope.loading = false;
		}
	};

	
	function tableFilter (row) {
		var truthy = true;
		var metrics = $scope.metrics;

	    if ( $scope.hidedata == true ) { return false; };
		if ( row.TOIDec < $scope.TOIMin || row.TOIDec > $scope.TOIMax ) { return false; };
		if ( $scope.checkboxFilterOn == true && row.checkboxFilter == false ) {return false;};

		angular.forEach( metrics , function ( metric ) {
			var filter_min = $scope.filter_inputs[metric + 'Min'],
				filter_max = $scope.filter_inputs[metric + 'Max'],
				value = row[metric];

			if ( value < filter_min || value > filter_max ) { 
				truthy = false;	
				return;	
			};
		});
		return truthy;
	};

	function toggleTableFilters() {
		$scope.showFilters = !$scope.showFilters;
	}

	function checkForErrors ( data ) {
		if (angular.isArray(data)) {
			$scope.error_message = null;
		} else { 
			$scope.error_message = 'Something wrong, please try again.';
		}
		return data;
	}
	
	function setOrderByField (field) {
		if (field == $scope.orderByField) {
			$scope.reverseSort = !$scope.reverseSort;
			return;
		};
		$scope.orderByField = field;
	}
	
};