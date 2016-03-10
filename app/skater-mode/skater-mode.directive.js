
angular
	.module('puckalyticsMainApp.skaterMode', [
		'ui.router',
        'ui.bootstrap',
        'puckalyticsMainApp.skaterMode'
	])
	.directive('skaterMode', SkaterModeDirective );

function SkaterModeDirective (skaterModeServices) {
    return {
        restrict: 'E',
        templateUrl: 'app/skater-mode/skater-mode.html',
        scope: {
            data: '=data',
            payload: '=payload',
        },
        link: SkaterModeLink,
        controller: SkaterModeController,
    }
}

function SkaterModeController($scope, skaterModeServices) {
    $scope.$watch( 'data' , init );
    function init(skater) {
        if (!skater || !skater.length) { return; }
        $scope.skater = skater[0];      
        var logo_path = setTeamImage($scope.skater);
        angular.extend( $scope.skater , logo_path );
        // var metrics = 'SA';        
        var metrics = $scope.metrics = ['CF'];        
        $scope.charting_data = skaterModeServices.createRenderData($scope.payload, metrics);
	}
	
	function setTeamImage(skater) {
		var name = skater['Team'].split(' ').join('_');
		var logo_stub = '/assets/images/team-logos/';
		return { logo_path: logo_stub + name + '.svg'};
	}
}

function SkaterModeLink (
    scope, ele, attrs, skaterModeServices
) {
    scope.$watch( 'charting_data' , function (val) {
        console.log('watcher for charting_data GO!');
        render(val);
    });

    var margin = {top: 50, right: 50, bottom: 20, left: 100},
    width = 300 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    var min = Infinity,
        max = -Infinity;

    var chart = d3.box()
        .whiskers(iqr(1.5))
        .width(width/2)
        .height(height);

    function render (raw_data) {
        if (!raw_data || !raw_data.length) { return; }
        var data = [];
        raw_data.forEach(function(x) {
            var e = Math.floor(x.plot_number - 1),
                r = Math.floor(x.index - 1),
                s = Math.floor(x.value),
                d = data[e];
            
            if (!d) d = data[e] = [s];
            else d.push(s);
            if (s > max) max = s;
            if (s < min) min = s;
        });

        chart.domain([min, max]);

        d3.select("#box-and-whisker-container svg").remove();
        var svg = d3.select("#box-and-whisker-container")
            .selectAll("svg")
            .data(data)
            .enter().append("svg")
            .attr("class", "box")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.bottom + margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(chart);

        // the y-axis
    var y = d3.scale.linear()
        .domain([min, max])
        .range([height, 0]);
    
    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
 
     // draw y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style("font-size", "16px") 
          .text("Metric:" + scope.metrics[0] + "");                    

    };

    // Returns a function to compute the interquartile range.
    function iqr(k) {
      return function(d, i) {
        var q1 = d.quartiles[0],
            q3 = d.quartiles[2],
            iqr = (q3 - q1) * k,
            i = -1,
            j = d.length;
        while (d[++i] < q1 - iqr);
        while (d[--j] > q3 + iqr);
        return [i, j];
      };
    }

    function setMetricFromListClick ($event, met) { 
        scope.metric = met;
    } 
}