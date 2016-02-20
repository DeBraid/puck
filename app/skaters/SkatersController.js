var skaters = angular
	.module('puckalyticsMainApp.skaters', [
		'ui.router', 
		'ui.bootstrap',
	]);

	
// skaters.filter('tableHeaderFilter') at bottom
skaters.filter('startFrom', function() {
    return function(input, start) {         
        return input.slice(start);
	}
});

skaters.controller('SkatersController', SkatersController);

function SkatersController (
	$scope, $stateParams, skatersConstants,	secretConstants, getParamsFromUrl, getData
) {
	var counter = 1;
	var decimal_fields = ['60', 'Pct', 'TM', 'Dec'];
	var excluded_metrics = ['PID', 'First_Name', 'Last_Name', 'TOI'];
	var string_headers = ['Player_Name', 'Team', 'Pos'];
	var defaults = {
		setOrderByField : setOrderByField,
		orderByField : 'CFPct',
		error_message : null,
		showFilters : false,
		reverseSort : true,
		//tableRowMax : tableRowMax,
		playerdata_length : 0,
		pageSize : 20,
		showingAllData : false,
		currentPage : 0,
		adding_rows : false,
		excluded_metrics: excluded_metrics,
		string_headers: string_headers,
		loading : false,
		hidedata : false,
	    playerdata : [],
	    metrics : [],
	    filter_inputs : {},
	    //updateSections : updateSections,
		skaterStats: skatersConstants.skater_metrics_object,
	    section_options : skatersConstants.section_options,
	    section_data_url : secretConstants.skater_data_url,
		toggleTableFilters : toggleTableFilters,
		toggleStatDisplay : toggleStatDisplay,
		toggleCheckboxFilter : toggleCheckboxFilter,
		statFilter : statFilter,
		tableFilter : tableFilter,
		displayFilter : {
			displayInfo : true,
			displayGoals : true,
			displayCorsi : true,
			displayPcts : true,
			displayTM : false,
			displayOpp : false,
			displayRelTM : false,
			displayIndividual : false,
			displayTeamPct : false,
			displayZoneStarts : false,
		},
		checkboxFilterOn : false,
		checkboxFilterText : 'Off',
		setCurrentPage : setCurrentPage,
		getNumberAsArray : getNumberAsArray,
		numberOfPages : numberOfPages,
		paginateData : paginateData,
		showAllData : showAllData,
		//displayStat : displayStat,
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

	$scope.$watch('orderByField', function (newVal, oldVal) {
		console.log('CTRL order_by_field_update oldVal, newVal', newVal);
		$scope.$broadcast('order_by_field_update', newVal);
	})

    // Functions List:
	function init() {
		$scope.loading = true;
		
		var skater_url = buildSkaterUrl();

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
			return '&' + slug_arr.join('');
		}

		function setPlayerMetricsWithResponse ( response ) {
			var string_headers = $scope.string_headers;
			var excluded_strings = $scope.excluded_metrics;
			var players = $scope.playerdata = response;
			$scope.playerdata_length = players.length;
			
			var metrics = $scope.metrics = Object.keys(players[0]);
			$scope.$broadcast('skater_metrics', metrics); 

			angular.forEach( players , function(player) {
				player.checkboxFilter = false;
				if (player.Pos == 'R') { player.Pos = 'F(RW)'; }
				if (player.Pos == 'L') { player.Pos = 'F(LW)'; }
				if (player.Pos == 'C') { player.Pos = 'F(C)'; }
				player.FullName = player.Last_Name + ', ' + player.First_Name;
				
				angular.forEach( metrics , function (metric) {
					if (string_headers.indexOf(metric) > -1) { return; }
					if (excluded_strings.indexOf(metric) > -1) {
						player[metric] = null;
						return;
					}
					decimal_fields.map(function (field) {
						if ( metric.indexOf( field ) > -1) {
							player[metric] = parseFloat(player[metric]);
						};
					});
					player[metric] = parseFloat(player[metric]);
				});
			});
			
			$scope.loading = false;
		}
	};

	function checkForErrors ( data ) {
		if (angular.isArray(data)) {
			$scope.error_message = null;
		} else { 
			$scope.error_message = 'Something wrong, please try again.';
			$scope.loading = false;
		}
		return data;
	}	
	
	function statFilter(stat) {
		//console.log('here',stat.DisplayWhen, $scope.displayFilter[stat.DisplayWhen]);
		if($scope.displayFilter[stat.DisplayWhen]) {
			return(true);
		}
		return(false);
	};
	
	
	function tableFilter(row) {
		var truthy = true;
		var metrics = $scope.metrics;

		//console.log($scope.checkboxFilterOn, ' ', row.checkboxFilter)
		
		//if (row.Pos == 'D') { return false; };
	    if ( $scope.hidedata == true ) { return false; };
		if ( parseFloat(row.TOIDec) < $scope.TOIMin || parseFloat(row.TOIDec) > $scope.TOIMax ) { return false; };
		if ( $scope.checkboxFilterOn == true && row.checkboxFilter == false ) {return false;};

		angular.forEach( $scope.skaterStats , function ( stat ) {
			filter_min = stat['Min'];
			filter_max = stat['Max'];
			
			value = row[stat['API_Name']];
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

	function toggleCheckboxFilter() {
		if ($scope.checkboxFilterOn) {
			$scope.checkboxFilterOn = false;
			$scope.checkboxFilterText = 'Off';
		} else {
			$scope.checkboxFilterOn = true;
			$scope.checkboxFilterText = 'On';
		}
		//$scope.checkboxFilterOn = !$scope.checkboxFilterOn;
	}

	function toggleStatDisplay (stat) {
		if ($scope.displayFilter[stat]) {
			$scope.displayFilter[stat] = false;
		} else {
			$scope.displayFilter[stat] = true;
		}
	}

	function setOrderByField (field) {
		// console.log('go setOrderByField with: field', field);
		if (field == $scope.orderByField) {
			$scope.reverseSort = !$scope.reverseSort;
			return;
		};
		$scope.orderByField = field;
	}



	function setCurrentPage(currentPage) {
		$scope.currentPage = currentPage;
	}

	function getNumberAsArray(num) {
		return new Array(num);
	};

	function numberOfPages() {
		return Math.ceil($scope.playerdata.length/ $scope.pageSize);
	};
	function showAllData() {
		$scope.pageSize = $scope.playerdata.length;
		$scope.showingAllData = true;
	};
	function paginateData() {
		$scope.pageSize = 50;
		$scope.showingAllData = false;
	};

	
/*	
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
		if (target.value === 0) {
			target.value = 1;
			setOrderByField( target.order_by );
		} else {
			target.value = 0;
		}
		if (target.reset) {
			angular.forEach($scope.section_options, function (section) {
				var name = section.name;
				section.value = 0;
				if ( name == 'info' || name == 'corsi' ) {
					section.value = 1;
				};
			});
		};
		if (target.show_all) {
			angular.forEach($scope.section_options, function (section) {
				section.value = 1;
			});
		};
		
		//init();
	}
	*/
};


/*
skaters.filter('tableHeaderFilter', function(){
	return function(header){
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
*/