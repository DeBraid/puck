
angular
	.module('puckalyticsMainApp.skaters', [
		'ui.router', 
		'ui.bootstrap'
	])
	.controller('SkatersController', SkatersController );

function SkatersController (
	$scope, $stateParams, skatersConstants, secretConstants,
	getParamsFromUrl, getData
) {
	var section_options = {
		info : 1,
		goal : 1,
		shot : 1,
		fenwick : 1,
		corsi : 1,
		pcts : 1,
		pctteam : 1,
		individual : 0,
		faceoffs : 0,
	};
	var defaults = {
		orderByField : 'GFPct',
		error_message : null,
		showFilters : true,
		reverseSort : true,
		loading : false,
		hidedata : false,
	    playerdata : [],
	    metrics : [],
	    filter_inputs : {},
	    section_options : section_options,
	    section_data_url : secretConstants.skater_data_url,
	    setOrderByField : setOrderByField, 
		toggleTableFilters : toggleTableFilters,
		tableFilter : tableFilter,
	};
	
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

    // Functions List:
	function init() {
		$scope.loading = true;
		
		var skater_url = buildSkaterUrl();
		// var skater_url = $scope.section_data_url + '?season=201516&sit=5v5&teamid=0&pos=skaters&minutes=100&goal=1&info=1';
		
		getData
			.stats(skater_url, $scope.season, $scope.situation, $scope.TOIMin)
			.then(checkForErrors)
			.then(setPlayerMetricsWithResponse);

		function setPlayerMetricsWithResponse ( response ) {
			// var metrics = $scope.metrics;
			var players = $scope.playerdata = response;
			var metrics = $scope.metrics = Object.keys(players[0]);
			var string_column_header = [
				'Player_Name', 'First_Name', 'Last_Name', 'Team', 'Pos'
			];

			angular.forEach( players , function(player) {
				player.checkboxFilter = false;
				
				angular.forEach( metrics , function (metric) {
					if (string_column_header.indexOf(metric) > -1) {
						// don't parse strings 
						return;
					}
					player[metric] = parseFloat(player[metric]);
				});
			});
			
			$scope.loading = false;
		}
		
		function buildSkaterUrl () {
			var slug_arr = [];		
			for (key in $scope.section_options) {
				var new_slug = '' + key + '=' + $scope.section_options[key] + '&';
				slug_arr.push(new_slug);
			};
			return $scope.section_data_url + '?' + slug_arr.join('');
		}
	};

	
	function tableFilter (row) {
		var truthy = true;
		var metrics = $scope.metrics;

	    if ( $scope.hidedata == true ) { return false; };
		if ( parseFloat(row.TOIDec) < $scope.TOIMin || parseFloat(row.TOIDec) > $scope.TOIMax ) { return false; };
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

	function setOrderByField (field) {
		if (field == $scope.orderByField) {
			$scope.reverseSort = !$scope.reverseSort;
			return;
		};
		$scope.orderByField = field;
	}

	function checkForErrors ( data ) {
		if (angular.isArray(data)) {
			$scope.error_message = null;
		} else { 
			$scope.error_message = 'Something wrong, please try again.';
			$scope.loading = false;
		}
		return data;
	}
};