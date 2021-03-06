
angular
	.module('puckalyticsMainApp.getData', [])
	.factory('getData', [ 
		'$http' , '$location', get_data_service 
	]);

function get_data_service ($http, $location) {
	return {
		stats : getStatsFromDB
	}
	
	function getStatsFromDB (request_url, season, situation, TOIMin, skater_params) {

		var url = setURL(request_url);
		var config = {
			method: 'GET',
			url: url
		};
		
		return $http(config)
			.then(success, error); 
		
		function setURL (section_url) {
		 	var dev_root_url = 'http://puckalytics.com/';
			var full_url = dev_root_url + 
				section_url + 
				'?season=' + season + 
				'&sit=' + situation + 
				'&minutes=' + TOIMin;
			
			if (skater_params) {
				full_url = full_url + skater_params;
			};				
			return full_url;
		}

		function success(response) {
			// console.log('stats success response', response);
			return response.data;
		}

		function error(response) {
			// console.log('stats error response', response);
			return response;
		}		
		
	}
}