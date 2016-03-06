
angular
	.module('puckalyticsMainApp.skaterModeServices', [])
	.service('skaterModeServices', skaterModeServices );

function skaterModeServices () {
	return {
		quartiles : calcQuartiles,
		extent : calcExtent,
		sortByMetric : sortByMetric
	}
	
	// return array of quartiles 
	function calcQuartiles(payload, metric) {
		var sorted_arr = sortByMetric(payload, metric);
		
		return [
			d3.quantile(sorted_arr, .25).toFixed(3),
			d3.quantile(sorted_arr, .5).toFixed(3),
			d3.quantile(sorted_arr, .75).toFixed(3)
		];
	}

	function calcExtent(data, metric) {
		var arr = sortByMetric(data, metric);
		console.log('arr in extent');
		return d3.extent(arr, function(d) { return d; });
	}

	// given array of objects, 
	// return an a sorted flat array for given metric
	function sortByMetric(data, metric) {
		var arr = [];
		d3.nest()
			.key(function(d) { return d[metric]; })
			.sortKeys(d3.descending)
			.key(function(d) { return arr.push(d[metric]); })
			.entries(data);
		return arr;				
	}
}