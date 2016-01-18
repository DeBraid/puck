
angular
	.module('puckalyticsMainApp.teams', [
		'ui.router', 
		'ui.bootstrap'
	])
	.controller('TeamsController', TeamsController );

function TeamsController (
	$scope, $stateParams, teamsConstants, secretConstants,
	getParamsFromUrl, getData
) {
	var team_display_settings = {
		displayGoals : true,
		displayShots : false,
		displayFenwick : false,
		displayCorsi : false,
		displayZoneStarts : false,
	}
	var defaults = {
		setOrderByField: setOrderByField,
		filter_inputs: {},
		orderByField : 'GFPct',
	    section_data_url: secretConstants.teams_data_url,
		showFilters : true,
		reverseSort : true,
		loading : false,
		error_message : null,
		hidedata : false,
	    team_data : [],
	    metrics: teamsConstants.team_metrics_object,
		toggleTableFilters : toggleTableFilters,
		tableFilter : tableFilter,
	};
	
	// Actions :
	// 1. put defaults on scope
	angular.extend( $scope , defaults , team_display_settings );
	
	// 2. get values from URL and attach to $scope 
	getParamsFromUrl.get($stateParams, $scope);

	// 3. main fn - bootstrap the controller
	init();

	// watch filter_menu directive for new data inputs
	$scope.$on('filter_menu_update', function(){
    	init();
	});

    // Functions List:
	function init() {
		$scope.loading = true;
		// 2. get values from URL and attach to $scope 
		// getParamsFromUrl.get($stateParams, $scope);
		
		getData
			.stats($scope.section_data_url, $scope.season, $scope.situation, $scope.TOIMin)
			.then(checkForErrors)
			.then(setMetricsWithResponse);

		function setMetricsWithResponse ( response ) {
			var metrics = $scope.metrics;
			var teams = $scope.team_data = response;

			angular.forEach( teams , function(team) {
				team.checkboxFilter = false;
				
				angular.forEach( metrics , function (metric) {
					var stat = metric.metric;
					team[stat] = parseFloat(team[stat]);
				});
			});
			
			$scope.loading = false;
		}
	};
	
	function tableFilter (row) {
		// console.log('row', row);
		var truthy = true;
		var metrics = $scope.metrics;

	    if ( $scope.hidedata == true ) { return false; };
		if ( parseFloat(row.TOIDec) < $scope.TOIMin || parseFloat(row.TOIDec) > $scope.TOIMax ) { return false; };
		if ( $scope.checkboxFilterOn == true && row.checkboxFilter == false ) {return false;};
		angular.forEach( metrics , function ( metric ) {
			
			var stat = metric.metric;
			var filter_min = $scope.filter_inputs[stat + 'Min'],
				filter_max = $scope.filter_inputs[stat + 'Max'],
				value = row[stat];
			if ( value < filter_min || value > filter_max ) { 
				truthy = false;	
				return truthy;	
			};
		});
		return truthy;
	};

	function setOrderByField (field) {
		if (field == $scope.orderByField) {
			$scope.reverseSort = !$scope.reverseSort;
			return;
		};
		$scope.orderByField = field;
	}

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
};