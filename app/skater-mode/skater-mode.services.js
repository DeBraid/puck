
angular
	.module('puckalyticsMainApp.skaterModeServices', [])
	.service('skaterModeServices', [ 
		'$http' , '$location', skaterModeServices 
	]);

function skaterModeServices ($http, $location) {
	return {
		quartiles : calcQuartiles
	}
	
	function calcQuartiles(payload) {
		var peer_group = payload;
		var metric = 'GF60';
		var sorted_arr = [];
		var metric_data = d3.nest()
			.key(function(d) { return d[metric]; })
			.sortKeys(d3.descending)
			.key(function(d) { return sorted_arr.push(d[metric]); })
			.entries(peer_group);

		return peerQuartiles(sorted_arr);

		function peerQuartiles(d) {
			// console.log('d in peerQuartiles', d);
			var extent = d3.extent(d, function(datum) { return datum; });
			return [
				extent[0],
				d3.quantile(d, .25).toFixed(3),
				d3.quantile(d, .5).toFixed(3),
				d3.quantile(d, .75).toFixed(3),
				extent[1]
			];
		}
	}
}