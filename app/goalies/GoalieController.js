
angular
	.module('puckalyticsMainApp.goalies', [
		'ui.router', 
		'ui.bootstrap'
	])
	.controller('GoalieController', GoalieController );

function GoalieController (
	$scope, $filter, $stateParams, goalieConstants, secretConstants,
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
	    foobarbaz : [],
	    filter_inputs : {},
	    active_filters : {},
	    activeFilterInputs : activeFilterInputs,
	    section_data_url : secretConstants.goalies_data_url,
	    metrics: goalieConstants.goalie_metrics_object,
		toggleTableFilters : toggleTableFilters,
		downloadCSV : downloadCSV,
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
	// $scope.$watch('foobarbaz', function (event, data) {
	// 	console.log('foobarbaz -- event, data', event, data);
	// });
	// $scope.$watch('foobarbaz', function (event, data) {
	// 	console.log('foobarbaz -- event, data', event, data);
	// }, true);
	// // add true per http://stackoverflow.com/questions/15721295/angularjs-watch-not-being-triggered-for-changes-to-an-array-of-objects?lq=1
	// $scope.$watchCollection('foobarbaz', function (event, data) {
	// 	console.log('foobarbaz -- event, data', event, data);
	// });
	function activeFilterInputs (value, input_field) {
		$scope.active_filters[input_field] = value;

		$scope.$broadcast('filter_inputs_changed', $scope.active_filters);
	}

    // Functions List:
	function init() {
		$scope.loading = true;
		$scope.$watch('foobarbaz', function (event, data) {
		console.log('foobarbaz -- event, data', event, data);
	});
	$scope.$watch('foobarbaz', function (event, data) {
		console.log('foobarbaz -- event, data', event, data);
	}, true);
	// add true per http://stackoverflow.com/questions/15721295/angularjs-watch-not-being-triggered-for-changes-to-an-array-of-objects?lq=1
	$scope.$watchCollection('foobarbaz', function (event, data) {
		console.log('foobarbaz -- event, data', event, data);
	});
		
		getData
			.stats($scope.section_data_url, $scope.season, $scope.situation, $scope.TOIMin)
			.then(checkForErrors)
			.then(setPlayerMetricsWithResponse);

		function setPlayerMetricsWithResponse ( response ) {
			var metrics = $scope.metrics;
			var players = $scope.playerdata = response;
            // console.log('metric:', metrics);

			angular.forEach( players , function(player) {
				player.checkboxFilter = false;
				
				angular.forEach( metrics , function (metric) {
					var stat = metric.metric;
					player['TOIDec'] = parseFloat(player['TOIDec']);
					player['GP'] = parseFloat(player['GP']);
					player[stat] = parseFloat(player[stat]);
				});
			});
			
			$scope.loading = false;
		}
	};

	
	function tableFilter (row) {
		var truthy = true;
		var metrics = $scope.metrics;
		var teamname = row.Team;
		var playername = row.Player_Name;

	    if ( $scope.hidedata == true ) { return false; };
		if ( row.TOIDec < $scope.filter_inputs.TOIMin || row.TOIDec > $scope.filter_inputs.TOIMax ) { return false; };
		if ( row.GP < $scope.filter_inputs.GPMin || row.GP > $scope.filter_inputs.GPMax ) { return false; };
		if ( $scope.checkboxFilterOn == true && row.checkboxFilter == false ) {return false;};

		//console.log('filter_input_team:', $scope.filter_inputs['team'], 'team: ', teamname, 'result: ', teamname.toLowerCase().indexOf($scope.filter_inputs['team']));
		if ( $scope.filter_inputs['team'] != '' && teamname.toLowerCase().indexOf($scope.filter_inputs['team'])==-1) {
			truthy = false;
			return;
		}
		if ( $scope.filter_inputs['player_name'] != '' && playername.toLowerCase().indexOf($scope.filter_inputs['player_name'])==-1) {
			truthy = false;
			return;
		}
 		
		angular.forEach( metrics , function ( metric ) {
			var filter_min = $scope.filter_inputs[metric.metric + 'Min'],
				filter_max = $scope.filter_inputs[metric.metric + 'Max'],
				value = row[metric.metric];
				
			//console.log('metric: ', metric.metric, ' value: ', value, ' min:', filter_min, ' max:', filter_max)

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

	function downloadCSV(filename) {
		var metrics = $scope.metrics;
		var rank=1;

		console.log('In downloadCSV');
		
		$scope.playerdata = $filter('orderBy')($scope.playerdata, $scope.orderByField, $scope.reverseSort);
		
		$scope.csvtxt = 'Rank,Goalie,Team,GP,TOI';
		angular.forEach( metrics , function ( metric ) {
			var stat = metric.metric;
			$scope.csvtxt = $scope.csvtxt + ',' + stat;
		});
		$scope.csvtxt += ',\n';

		angular.forEach( $scope.playerdata , function ( player, index ) {
			var teamname = player.Team;
			var playername = player.Player_Name;
			
			if (tableFilter(player)) {
				$scope.csvtxt = $scope.csvtxt + rank + ',' + player.Player_Name + ',' + player.Team + ',' + player.GP + ',' + player.TOIDec;
				rank = rank +1;
				angular.forEach( metrics , function ( metric ) {
					var stat = metric.metric;

					$scope.csvtxt = $scope.csvtxt + ',' + player[stat];
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