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
	$scope, $filter, $location, $state, /*$stateParams,*/ skatersConstants,	secretConstants, getParamsFromUrl, getData
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
		active_filters : {},
		activeFilterInputs : activeFilterInputs,
		//tableRowMax : tableRowMax,
		playerdata_length : 0,
		pageSize : 10,
		showingAllData : false,
		currentPage : 0,
		adding_rows : false,
		excluded_metrics: excluded_metrics,
		string_headers: string_headers,
		loading : false,
		hidedata : false,
	    playerdata : [],
		filtereddata : [],
	    metrics : [],
	    filter_inputs : {},
		currentUrl: '',
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
		search : {
			name : '',
			team : '',
			pos : ''
		},
		season: '201516',
		situation: '5v5',
		TOIMin: 200,
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
	
	//getParamsFromUrl.get($scope.params, $scope);

	// 3. main fn - bootstrap the controller
	startup();
	init();

	// watch filter_menu directive for new data inputs
	$scope.$on('filter_menu_update', function(event, data){
		$scope.season = data["season"];
		$scope.situation = data["situation"];
		$scope.TOIMin = data["TOIMin"];
		$scope.active_filters["season"] = data["season"];
		$scope.active_filters["situation"] = data["situation"];
		$scope.active_filters["TOIMin"] = data["TOIMin"];

		$scope.currentUrl = createUrl($scope.active_filters);
		$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
    	init();
	});

    $scope.$watch('checkboxFilterOn', function(){
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
    },true);	

    $scope.$watch('skaterStats', function(){
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
    },true);

    $scope.$watch('playerdata', function(){
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
    },true);
	
    $scope.$watch("search", function(){
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
		$scope.active_filters['Team'] = $scope.search.team;
		$scope.active_filters['Player_Name'] = $scope.search.name;
		$scope.active_filters['Pos'] = $scope.search.pos;
		$scope.currentUrl = createUrl($scope.active_filters);
		$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
    },true);

    $scope.$watch('checkboxFilterOn', function(){
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
    },true);	
	
    // Functions List:
	function startup() {	
		if ($location.search()['orderby']) {
			$scope.orderByField = $location.search()['orderby'];
			$scope.active_filters['orderby'] = $scope.orderByField;
		}
		if ($location.search()['sortorder']) {
			if ($location.search()['sortorder'] == 'true') {
				$scope.reverseSort = true;
				$scope.active_filters['sortorder'] = $scope.reverseSort;
			}
			if ($location.search()['sortorder'] == 'false') {
				$scope.reverseSort = false;
				$scope.active_filters['sortorder'] = $scope.reverseSort;
			}
		}		
		
		if ($location.search()['season']) {
			$scope.season = $location.search()['season'];
			$scope.active_filters['season'] = $scope.season;
		}
		if ($location.search()['situation']) {
			$scope.situation = $location.search()['situation'];
			$scope.active_filters['situation'] = $scope.situation;
		}
		if ($location.search()['TOIMin']) {
			$scope.TOIMin = $location.search()['TOIMin'];
			$scope.active_filters['TOIMin'] = $scope.TOIMin;
		}
		if ($location.search()['Team']) {
			$scope.search.team = $location.search()['Team'];
			$scope.active_filters['Team'] = $scope.search.team;
		}
		if ($location.search()['Player_Name']) {
			$scope.search.name = $location.search()['Player_Name'];
			$scope.active_filters['Player_Name'] = $scope.search.name;
		}
		if ($location.search()['Pos']) {
			$scope.search.pos = $location.search()['Pos'];
			$scope.active_filters['Pos'] = $scope.search.pos;
		}

		angular.forEach( $scope.skaterStats , function ( stat ) {
			if ($location.search()[stat.API_Name+'Min']) {
				stat.Min = $location.search()[stat.API_Name+'Min'];
				$scope.active_filters[stat.API_Name+'Min'] = stat.Min;
			}
			if ($location.search()[stat.API_Name+'Max']) {
				stat.Max = $location.search()[stat.API_Name+'Max'];
				$scope.active_filters[stat.API_Name+'Max'] = stat.Max;
			}
		});
		
		$scope.currentUrl = createUrl($scope.active_filters);
		setTimeout(function(){
			$scope.$apply(function(){
				$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
			});
		}, 1000);
		
		//$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
	}

    function createUrl(filters) {
        //var params = [];
		var absUrl = $location.absUrl();
		var split_url = absUrl.split('#');
		var url='';
        for (key in filters) {
			if (url=='') {
				url = url + '?' + key + '=' + filters[key];
			} else {
				url = url + '&' + key + '=' + filters[key];
			}
        }
		url = split_url[0] + '#/skaters' + url;
		return url;
    }	
	
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
	
	function activeFilterInputs(value, input_field) {
		$scope.active_filters[input_field] = value;

		$scope.currentUrl = createUrl($scope.active_filters);
		$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
	}

	function statFilter(stat) {
		if($scope.displayFilter[stat.DisplayWhen]) {
			return(true);
		}
		return(false);
	};
	
	function tableFilter(row) {
		var truthy = true;
		var metrics = $scope.metrics;
		var teamname = row.Team;
		var playername = row.Player_Name;
		var position = row.Pos; 
		
		//if (row.Pos == 'D') { return false; };
	    if ( $scope.hidedata == true ) { return false; };
		if ( parseFloat(row.TOIDec) < $scope.TOIMin || parseFloat(row.TOIDec) > $scope.TOIMax ) { return false; };
		if ( $scope.checkboxFilterOn == true && row.checkboxFilter == false ) {return false;};

		if ( $scope.search.team != '' && teamname.toLowerCase().indexOf($scope.search.team.toLowerCase())==-1) {
			truthy = false;
			return;
		}
		if ( $scope.search.name != '' && playername.toLowerCase().indexOf($scope.search.name.toLowerCase())==-1) {
			truthy = false;
			return;
		}
		if ( $scope.search.pos != '' && position.toLowerCase().indexOf($scope.search.pos.toLowerCase())==-1) {
			truthy = false;
			return;
		}
		
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
		if (field == $scope.orderByField) {
			$scope.reverseSort = !$scope.reverseSort;
			$scope.active_filters['sortorder'] = $scope.reverseSort;
			$scope.currentUrl = createUrl($scope.active_filters);
			$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
			return;
		};
		$scope.orderByField = field;
		$scope.active_filters['orderby'] = field;
		$scope.active_filters['sortorder'] = $scope.reverseSort;
		$scope.currentUrl = createUrl($scope.active_filters);
		$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
	}



	function setCurrentPage(currentPage) {
		$scope.currentPage = currentPage;
	}

	function getNumberAsArray(num) {
		return new Array(num);
	};

	function numberOfPages() {
		return Math.ceil($scope.filtereddata.length/ $scope.pageSize);
	};
	function showAllData() {
		$scope.pageSize = $scope.filtereddata.length;
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