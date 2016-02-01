var skaters = angular
	.module('puckalyticsMainApp.skaters', [
		'ui.router', 
		'ui.bootstrap',
	]);

// skaters.filter() at bottom
skaters.controller('SkatersController', SkatersController);

function SkatersController (
	$scope, $stateParams, skatersConstants,
	secretConstants, getParamsFromUrl, getData
) {
	var counter = 1;
	var decimal_fields = ['60', 'Pct', 'TM', 'Dec'];
	var excluded_metrics = ['PID', 'First_Name', 'Last_Name', 'TOI'];
	var string_headers = ['Player_Name', 'Team', 'Pos'];
	var defaults = {
		orderByField : 'CFPct',
		error_message : null,
		showFilters : true,
		reverseSort : true,
		tableRowMax : tableRowMax,
		table_rows : 10,
		adding_rows : false,
		excluded_metrics: excluded_metrics,
		string_headers: string_headers,
		loading : false,
		hidedata : false,
	    playerdata : [],
	    metrics : [],
	    filter_inputs : {},
	    updateSections : updateSections,
	    section_options : skatersConstants.section_options,
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
		console.log('$scope.season, $scope.situation, $scope.TOIMin', $scope.season, $scope.situation, $scope.TOIMin);
		getData
			.stats($scope.section_data_url, $scope.season, $scope.situation, $scope.TOIMin, skater_url )
			.then(checkForErrors)
			.then(setPlayerMetricsWithResponse);

		function buildSkaterUrl () {
			var slug_arr = [];		
			var sections = $scope.section_options;

			sections.map(function (section) {
				var new_slug = '' + section.name + '=' + section.value + '&';
				slug_arr.push(new_slug);
			});
			// return $scope.section_data_url + '?' + slug_arr.join('');
			return '&' + slug_arr.join('');
		}

		function setPlayerMetricsWithResponse ( response ) {
			var string_headers = $scope.string_headers;
			var excluded_strings = $scope.excluded_metrics;
			var players = $scope.playerdata = response;
			$scope.playerdata_length = players.length;
			var metrics = $scope.metrics = Object.keys(players[0]);

			angular.forEach( players , function(player) {
				player.checkboxFilter = false;
				if (player.Pos == 'R') { player.Pos = 'F(RW)'; }
				if (player.Pos == 'L') { player.Pos = 'F(LW)'; }
				if (player.Pos == 'C') { player.Pos = 'F(C)'; }
				
				angular.forEach( metrics , function (metric) {
					if (string_headers.indexOf(metric) > -1) { return; }
					if (excluded_strings.indexOf(metric) > -1) {
						player[metric] = null;
						return;
					}
					decimal_fields.map(function (field) {
						if ( metric.indexOf( field ) > -1) {
							player[metric] = parseFloat(player[metric]).toFixed(1);
						};
					});
					player[metric] = parseFloat(player[metric]);
				});
			});
			
			$scope.loading = false;
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
		// console.log('go setOrderByField with: field', field);
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

	function tableRowMax ($event, show_all) {
		$scope.adding_rows = true;
		
		if (show_all) {
			$scope.table_rows = $scope.playerdata_length;
			$scope.adding_rows = false;
			return;
		};
		var max = 10;
		counter++
		$scope.table_rows = max*counter;
		$scope.adding_rows = false;
	}

	function updateSections ($event, target) {
		console.log('updateSections ($event, target)', target.value);
		if (target.value === 0) {
			target.value = 1;
		} else {
			target.value = 0;
		}
		console.log('target.value', target.value);
		angular.forEach($scope.section_options , function (section) {
			if (section == target.name) {
				section[target.name] = target.value;
			}
		});
		init();
	}

};

skaters.filter('tableHeaderFilter', function(){
	return function(header){
		// console.log('header', header);
		var output = header;
		var decimal_fields = ['60', 'Pct', 'RelTM'];
		
		decimal_fields.map(function (field) {			
			if ( header.indexOf( field ) > -1) {
				output = header.split( field );
				output = output[0] +" "+ field + " " + output[1];
			};
		});

		return output;
	}
});