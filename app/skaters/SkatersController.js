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
	$scope, $filter, $location, $state, 
	skatersConstants, secretConstants, 
	getParamsFromUrl, getData
) {
	var counter = 1;
	var decimal_fields = ['60', 'Pct', 'TM', 'Dec'];
	var excluded_metrics = ['First_Name', 'Last_Name', 'TOI'];
	var string_headers = ['Player_Name', 'Team', 'Pos'];
	var defaults = {
		setOrderByField : setOrderByField,
		orderByField : 'CFPct',
		error_message : null,
		showFilters : false,
		reverseSort : true,
		active_filters : {},
		activeFilterInputs : activeFilterInputs,
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
		filtereddata : [],
	    metrics : [],
	    filter_inputs : {},
		currentUrl: '',
		skaterStats: skatersConstants.skater_metrics_object,
	    section_options : skatersConstants.section_options,
	    section_data_url : secretConstants.skater_data_url,
		toggleTableFilters : toggleTableFilters,
		toggleStatDisplay : toggleStatDisplay,
		toggleCheckboxFilter : toggleCheckboxFilter,
		checkboxFilterOn : false,
		checkboxFilterText : 'Off',
		checkedplayers : '',
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
		setCurrentPage : setCurrentPage,
		getNumberAsArray : getNumberAsArray,
		numberOfPages : numberOfPages,
		paginateData : paginateData,
		showAllData : showAllData,
		downloadCSV : downloadCSV,
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

		updateUrl();
    	init();
	});

    $scope.$watch('skaterStats', function(){
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
    },true);

    $scope.$watch('playerdata', function(){
    	console.log('$scope.playerdata.length from $watcher', $scope.playerdata.length);
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
    });
	
    $scope.$watch("search", function(){
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
		$scope.active_filters['Team'] = $scope.search.team;
		$scope.active_filters['Player_Name'] = $scope.search.name;
		$scope.active_filters['Pos'] = $scope.search.pos;
		updateUrl();
    },true);

    $scope.$watch('checkboxFilterOn', function(){
        $scope.filtereddata = $filter('filter')($scope.playerdata, tableFilter);
    },true);	
	
    // Functions List:
    function updateUrl() {
		var absUrl = $location.absUrl();
		var split_url = absUrl.split('#');
		var url='';
        for (key in $scope.active_filters) {
			if (url=='') {
				url = url + '?' + key + '=' + $scope.active_filters[key];
			} else {
				url = url + '&' + key + '=' + $scope.active_filters[key];
			}
        }
		url = split_url[0] + '#/skaters' + url;
		//console.log('updatedurl:', url);
		
		$scope.currentUrl = url;
		$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
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
			if ($scope.showingAllData) {
				$scope.pageSize = $scope.playerdata_length;
			}
			
			var metrics = $scope.metrics = Object.keys(players[0]);
			$scope.$broadcast('skater_metrics', metrics); 


			angular.forEach( players , function(player) {
				if ($scope.checkedplayers != '') {
					var checkedplayers = $scope.checkedplayers.split(",");
					player.checkboxFilter = false;
					if (checkedplayers) {
						if (checkedplayers.indexOf(player["PID"]) >= 0) {
							player.checkboxFilter = true;
						}
					}
				}
				player["PID"] = parseFloat(player["PID"]);
				
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
			$scope.checkedplayers = '';
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
		$scope.currentUrl = updateUrl();
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
			delete $scope.active_filters['checkbox'];
			$scope.checkboxFilterOn = false;
			$scope.checkboxFilterText = 'Off';
		} else {
			$scope.checkedplayers='0';
			angular.forEach( $scope.filtereddata , function(player) {
				if (player.checkboxFilter) {
					$scope.checkedplayers = $scope.checkedplayers + ',' + player.PID;
				}
			});			
			$scope.active_filters['checkbox']=$scope.checkedplayers;
			//We need to copy check boxes to unfiltered player list
			angular.forEach( $scope.playerdata , function(player) {
				if ($scope.checkedplayers != '') {
					var checkedplayers = $scope.checkedplayers.split(",");
					player.checkboxFilter = false;
					if (checkedplayers) {
						if (checkedplayers.indexOf(player["PID"].toString()) >= 0) {
							player.checkboxFilter = true;
						}
					}
				}
			});
			$scope.checkboxFilterOn = true;
			$scope.checkboxFilterText = 'On';
		}
		updateUrl();
	}

	function toggleStatDisplay (stat) {
		if ($scope.displayFilter[stat]) {
			$scope.displayFilter[stat] = false;
		} else {
			$scope.displayFilter[stat] = true;
		}
		$scope.active_filters["dgoals"]=$scope.displayFilter.displayGoals;
		$scope.active_filters["dcorsi"]=$scope.displayFilter.displayCorsi;
		$scope.active_filters["dpcts"]=$scope.displayFilter.displayPcts;
		$scope.active_filters["dtm"]=$scope.displayFilter.displayTM;
		$scope.active_filters["dopp"]=$scope.displayFilter.displayOpp;
		$scope.active_filters["dreltm"]=$scope.displayFilter.displayRelTM;
		$scope.active_filters["dind"]=$scope.displayFilter.displayIndividual;
		$scope.active_filters["dpctteam"]=$scope.displayFilter.displayTeamPct;
		$scope.active_filters["dzs"]=$scope.displayFilter.displayZoneStarts;
		updateUrl();
	}

	function setOrderByField (field) {
		if (field == $scope.orderByField) {
			$scope.reverseSort = !$scope.reverseSort;
			$scope.active_filters['sortorder'] = $scope.reverseSort;
			updateUrl();
			return;
		};
		$scope.orderByField = field;
		$scope.active_filters['orderby'] = field;
		$scope.active_filters['sortorder'] = $scope.reverseSort;
		updateUrl();
	}



	function setCurrentPage(currentPage) {
		$scope.currentPage = currentPage;
		$scope.active_filters['pagesize'] = $scope.pageSize;
		$scope.active_filters['paginate'] = 1;
		$scope.active_filters['curpage'] = $scope.currentPage;
		updateUrl();
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
		$scope.active_filters['paginate'] = 0;
		delete $scope.active_filters['pagesize'];
		delete $scope.active_filters['curpage'];
		updateUrl();
	};
	function paginateData() {
		$scope.pageSize = 20;
		$scope.currentPage = 1;
		$scope.showingAllData = false;
		$scope.active_filters['paginate'] = 1;
		$scope.active_filters['pagesize'] = $scope.pageSize;
		$scope.active_filters['curpage'] = $scope.currentPage;
		updateUrl();
	};

	function downloadCSV(filename) {
		var metrics = $scope.metrics;
		var rank=1;

		console.log('In downloadCSV');
		
		$scope.filtereddata = $filter('orderBy')($scope.filtereddata, $scope.orderByField, $scope.reverseSort);

		$scope.csvtxt = 'Rank,Player,Team,Pos';
		angular.forEach( $scope.skaterStats , function ( stat ) {
			if (statFilter(stat)) {
				var stat = stat.DisplayName;
				$scope.csvtxt = $scope.csvtxt + ',' + stat;
			}
		});
		$scope.csvtxt += ',\n';

		angular.forEach( $scope.filtereddata , function ( player, index ) {
			var teamname = player.Team;
			var playername = player.Player_Name;
			
			if (tableFilter(player)) {
				$scope.csvtxt = $scope.csvtxt + rank + ',' + player.FullName + ',' + player.Team + ',' + player.Pos;
				rank = rank +1;
				angular.forEach( $scope.skaterStats , function ( stat ) {
					if (statFilter(stat)) {
						$scope.csvtxt = $scope.csvtxt + ',' + player[stat.API_Name];
					}
				});
				$scope.csvtxt += '\n';
			}
		});
		$scope.csvtxt += 'Downloaded from Puckalytics.com (' + $scope.currentUrl + ')\n';
		
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

		if ($location.search()['paginate']) {
			$scope.active_filters['paginate'] = $location.search()['pagesize'];
			if ($location.search()['paginate'] == "1") {
				if ($location.search()['pagesize']) {
					$scope.pageSize = $location.search()['pagesize'];
					$scope.active_filters['pagesize'] = $scope.pageSize;
				}
				if ($location.search()['curpage']) {
					$scope.currentPage = $location.search()['curpage'];
					$scope.active_filters['curpage'] = $scope.currentPage;
				}
				$scope.showingAllData = false;
			} else {
				$scope.showingAllData = true;
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

		if ($location.search()['dgoals']) {
			if ($location.search()['dgoals'] == 'true') {
				$scope.displayFilter.displayGoals = true;
			} else if ($location.search()['dgoals'] == 'false') {
				$scope.displayFilter.displayGoals = false;
			}
			$scope.active_filters['dgoals'] = $scope.displayFilter.displayGoals;
		}
		
		if ($location.search()['dcorsi']) {
			if ($location.search()['dcorsi'] == 'true') {
				$scope.displayFilter.displayCorsi = true;
			} else if ($location.search()['dcorsi'] == 'false') {
				$scope.displayFilter.displayCorsi = false;
			}
			$scope.active_filters['dcorsi'] = $scope.displayFilter.displayCorsi;
		}
		
		if ($location.search()['dpcts']) {
			if ($location.search()['dpcts'] == 'true') {
				$scope.displayFilter.displayPcts = true;
			} else if ($location.search()['dpcts'] == 'false') {
				$scope.displayFilter.displayPcts = false;
			}
			$scope.active_filters['dpcts'] = $scope.displayFilter.displayPcts;
		}
		
		if ($location.search()['dtm']) {
			if ($location.search()['dtm'] == 'true') {
				$scope.displayFilter.displayTM = true;
			} else if ($location.search()['dtm'] == 'false') {
				$scope.displayFilter.displayTM = false;
			}
			$scope.active_filters['dtm'] = $scope.displayFilter.displayTM;
		}
		
		if ($location.search()['dopp']) {
			if ($location.search()['dopp'] == 'true') {
				$scope.displayFilter.displayOpp = true;
			} else if ($location.search()['dopp'] == 'false') {
				$scope.displayFilter.displayOpp = false;
			}
			$scope.active_filters['dopp'] = $scope.displayFilter.displayOpp;
		}		

		if ($location.search()['dreltm']) {
			if ($location.search()['dreltm'] == 'true') {
				$scope.displayFilter.displayRelTM = true;
			} else if ($location.search()['dreltm'] == 'false') {
				$scope.displayFilter.displayRelTM = false;
			}
			$scope.active_filters['dreltm'] = $scope.displayFilter.displayRelTM;
		}

		if ($location.search()['dind']) {
			if ($location.search()['dind'] == 'true') {
				$scope.displayFilter.displayIndividual = true;
			} else if ($location.search()['dind'] == 'false') {
				$scope.displayFilter.displayIndividual = false;
			}
			$scope.active_filters['dind'] = $scope.displayFilter.displayIndividual;
		}
		
		if ($location.search()['dpctteam']) {
			if ($location.search()['dpctteam'] == 'true') {
				$scope.displayFilter.displayTeamPct = true;
			} else if ($location.search()['dpctteam'] == 'false') {
				$scope.displayFilter.displayTeamPct = false;
			}
			$scope.active_filters['dpctteam'] = $scope.displayFilter.displayTeamPct;
		}
		
		if ($location.search()['dzs']) {
			if ($location.search()['dzs'] == 'true') {
				$scope.displayFilter.displayZoneStarts = true;
			} else if ($location.search()['dzs'] == 'false') {
				$scope.displayFilter.displayZoneStarts = false;
			}
			$scope.active_filters['dzs'] = $scope.displayFilter.displayZoneStarts;
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
		
		if ($location.search()['checkbox']) {
			$scope.checkboxFilterOn = true;
			$scope.checkedplayers = $location.search()['checkbox'];
			$scope.active_filters['checkbox'] = $scope.checkedplayers;
		}		
		
		updateUrl();
		setTimeout(function(){
			$scope.$apply(function(){
				$scope.$broadcast('skater_filter_changed', $scope.currentUrl);
			});
		}, 1000);		
	}
};

