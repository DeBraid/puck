
angular
	.module('puckalyticsMainApp.teams', [
		'ui.router', 
		'ui.bootstrap'
	])
	.controller('TeamsController', TeamsController );

function TeamsController (
	$scope, $filter, $stateParams, teamsConstants, secretConstants,
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
		//csvtxt : '',
		searchteamname : 'w',
		team_colours: teamsConstants.team_colours,
		orderByField : 'GFPct',
	    section_data_url: secretConstants.teams_data_url,
		showFilters : true,
		reverseSort : true,
		loading : false,
		error_message : null,
		hidedata : false,
	    team_data : [],
		active_filters : {},
		activeFilterInputs : activeFilterInputs,
	    metrics: teamsConstants.team_metrics_arr,
		toggleTableFilters : toggleTableFilters,
		downloadCSV : downloadCSV,
		tableFilter : tableFilter,
		search : {teamname:""},
	};

	//$scope.searchteamname='w';
	
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

	function activeFilterInputs (value, input_field) {
		$scope.active_filters[input_field] = value;

		$scope.$broadcast('filter_inputs_changed', $scope.active_filters);
	}

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
					team['TOIDec'] = parseFloat(team['TOIDec']);
					team[stat] = parseFloat(team[stat]);
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

	function downloadCSV(filename,searchText) {
		var metrics = $scope.metrics;
		var rank=1;

		$scope.team_data = $filter('orderBy')($scope.team_data, $scope.orderByField, $scope.reverseSort);
		
		$scope.csvtxt = 'Rank, Team, GP, TOI';
		angular.forEach( metrics , function ( metric ) {
			var stat = metric.metric;
			var filter = metric.filter;
			if ($scope[filter]) {
				$scope.csvtxt = $scope.csvtxt + ',' + stat;
			}
		});
		$scope.csvtxt += ',\n';

		angular.forEach( $scope.team_data , function ( team, index ) {
			var teamname = team.teamname;
			
			if (teamname.toLowerCase().indexOf(searchText)!=-1 && tableFilter(team)) {
				$scope.csvtxt = $scope.csvtxt + rank + ',' + team.teamname + ',' + team.GP + ',' + team.TOIDec;
				rank = rank +1;
				angular.forEach( metrics , function ( metric ) {
					var stat = metric.metric;
					var filter = metric.filter;

					if ($scope[filter]) {
						$scope.csvtxt = $scope.csvtxt + ',' + team[stat];
					}
				});
				$scope.csvtxt += ',\n';
			}
		});
		
		$scope.csvtxt += 'Downloaded from Puckalytics.com (http://www.puckalytics.com)\n';
		
		var a = document.createElement('a');
		mimeType = 'text/csv' || 'application/octet-stream';

		if (navigator.msSaveBlob) { // IE10
		return navigator.msSaveBlob(new Blob([$scope.csvtxt], { type: mimeType }),     filename);
		} else if ('download' in a) { //html5 A[download]
			a.href = 'data:' + mimeType + ',' + encodeURIComponent($scope.csvtxt);
			a.setAttribute('download', filename);
			document.body.appendChild(a);
			setTimeout(function() {
			  a.click();
			  document.body.removeChild(a);
			}, 66);
			return true;
		} else { //do iframe dataURL download (old ch+FF):
			var f = document.createElement('iframe');
			document.body.appendChild(f);
			f.src = 'data:' + mimeType + ',' + encodeURIComponent($scope.csvtxt);

			setTimeout(function() {
			  document.body.removeChild(f);
			}, 333);
			return true;
		}
		
	}

};