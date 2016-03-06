
angular
	.module('puckalyticsMainApp.skaterModeServices', [])
	.factory('skaterModeServices', [ 
		'$http' , '$location', skaterModeServices 
	]);

function skaterModeServices ($http, $location) {
	return {
		quartiles : calcQuartiles
	}
	
	// function doMathWithPayload() {
	function calcQuartiles() {

		console.log('calcQuartiles running!');
		// var peer_group = $scope.payload;
		// var metric = 'GF60';
		// var sorted_arr = [];
		// var metric_data = d3.nest()
		// 	.key(function(d) { return d[metric]; })
		// 	.sortKeys(d3.descending)
		// 	.key(function(d) { return sorted_arr.push(d[metric]); })
		// 	.entries(peer_group);

		// var quartiles_arr = peerQuartiles(sorted_arr);
		// console.log('quartiles_arr', quartiles_arr);

		// function peerQuartiles(d) {
		// 	// console.log('d in peerQuartiles', d);
		// 	var extent = d3.extent(d, function(datum) { return datum; });
		// 	return [
		// 		extent[0],
		// 		d3.quantile(d, .25).toFixed(3),
		// 		d3.quantile(d, .5).toFixed(3),
		// 		d3.quantile(d, .75).toFixed(3),
		// 		extent[1]
		// 	];
		// }
	}
	// function calcQuartiles (request_url, season, situation, TOIMin, skater_params) {
	// function calcQuartiles () {

	// 	var url = setURL(request_url);
	// 	var config = {
	// 		method: 'GET',
	// 		url: url
	// 	};
		
	// 	return $http(config)
	// 		.then(success, error); 
		
	// 	function setURL (section_url) {
	// 	 	var dev_root_url = 'http://puckalytics.com/';
	// 		var full_url = dev_root_url + 
	// 			section_url + 
	// 			'?season=' + season + 
	// 			'&sit=' + situation + 
	// 			'&minutes=' + TOIMin;
			
	// 		if (skater_params) {
	// 			full_url = full_url + skater_params;
	// 		};				
	// 		return full_url;
	// 	}

	// 	function success(response) {
	// 		// console.log('stats success response', response);
	// 		return response.data;
	// 	}

	// 	function error(response) {
	// 		// console.log('stats error response', response);
	// 		return response;
	// 	}		
		
	// }
}