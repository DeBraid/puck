
angular
	.module('puckalyticsMainApp.skaterModeServices', [])
	.service('skaterModeServices', skaterModeServices);

function skaterModeServices() {
    return {
        quartiles: calcQuartiles,
        extent: calcExtent,
        sortByMetric: sortByMetric,
        createRenderData: createRenderData,
    }
    // return array of objects for d3js chart
    function createRenderData(payload, metric) {
        var data = setChartingData(payload, metric);
        // console.log(' new data createRenderData', data);
        return data;
    }
    function setChartingData(data, metric) {
        var charting_data = [];
        data.map(function (entity, index) {    
            var name, team; 
            if ( entity.Player_Name ) {
                name = entity.Player_Name;
                team = entity.Team;
            } else if ( entity.FullName ) {
                name = entity.FullName
                team = entity.Team;
            } else {
                name = entity.teamname;
            }

            charting_data.push({
                plot_number : "1",
                metric : metric,
                value: entity[metric], 
                entity : name,
                index : index + 1,
                team : team
            });
        });
        return charting_data;
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
        return d3.extent(arr, function(d) {
            return d;
        });
    }
    // given array of objects, 
    // return an a sorted flat array for given metric
    function sortByMetric(data, metric) {
        var arr = [];
        d3.nest().key(function(d) {
            return d[metric];
        }).sortKeys(d3.descending).key(function(d) {
            return arr.push(d[metric]);
        }).entries(data);
        return arr;
    }
}