
angular
	.module('puckalyticsMainApp.barChart', [
		'ui.router', 
		'ui.bootstrap',
        'puckalyticsMainApp.getData'
	])
	.directive('barChart', BarChartDirective );

function BarChartDirective (getData) {
    return {
        restrict: 'E',
        templateUrl: 'app/bar-chart/bar-chart.html',
        scope: {
            data: '=data',
        },
        link: BarChartLink,
    }
}

function BarChartLink (
    scope, ele, attrs
) {
    console.log('scope.data', scope.data);

    scope.charting_data = [];
    scope.title = 'Bar Chart for Teams: Foo';
    scope.metric = 'CFPct';
    // scope.submit = function () {
    //     // console.log('submit data', data[0]);
    // }

    scope.$watch('metric', function(newVal, oldVal) {
        
        console.log('newVal', newVal);
        
        var data = scope.data;
        var metrics = Object.keys(data[0]);
        if (!metrics) {return;}
        console.log('metrics', metrics);
        
        if ( metrics.indexOf(newVal) > -1 ) {
            
            data.map(function (team) {
                scope.charting_data.push({
                    metric : newVal,
                    value: team[newVal], 
                    team : team.teamname
                });
            });
            // drawChart(scope.charting_data);
            console.log('scope.charting_data', scope.charting_data);
            scope.render(scope.charting_data);
        }

        // function drawChart (data) {
            // console.log('data in drawChart', data);
            
            // console.log('svg', svg);
            
            
            // window.onresize = function() {
            //     scope.$apply();
            // };
            // scope.$watch(function() {
            //     return angular.element(window)[0].innerWidth;
            // }, function() {
            //     scope.render(scope.data);
            // });

            // scope.$watch('data', function(newData) {
            //     scope.render(newData);
            // }, true);

        scope.render = function(render_data) {
            var renderTimeout;
            var margin = parseInt(attrs.margin) || 20,
                barHeight = parseInt(attrs.barHeight) || 20,
                barPadding = parseInt(attrs.barPadding) || 5;
            
            var svg = d3.select('#bar-chart')
                .append('svg').style('width', '100%');
                console.log('svg', svg);

            // svg.selectAll('*').remove();
            if (!render_data) return;
            if (renderTimeout) clearTimeout(renderTimeout);
          
            renderTimeout = setTimeout(function() {
                console.log('running setTimeout');
                // console.log('scope.data', scope.data);
                var width = 500,
                    height = render_data.length * (barHeight + barPadding),
                    color = d3.scale.category20(),
                    min = d3.min(render_data, function(d) { return d.value; }),
                    max = d3.max(render_data, function(d) { return d.value; });
                
                var xScale = d3.scale.linear()
                        .domain([min,max])
                        .range([0, width]);

                svg.attr('height', height);
                svg.selectAll('rect')
                .data(render_data).enter()
                .append('rect').on('click', function(d, i) {
                    return scope.onClick({
                        item: d
                    });
                })
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', Math.round(margin / 2))
                .attr('y', function(d, i) {
                    return i * (barHeight + barPadding);
                })
                .attr('fill', function(d) {
                    return color(d.value);
                })
                .transition().duration(1000).attr('width', function(d) {
                    return xScale(d.value);
                });
                
                svg.selectAll('text')
                .data(data).enter().append('text')
                .attr('fill', '#fff').attr('y', function(d, i) {
                    return i * (barHeight + barPadding) + 15;
                })
                .attr('x', 15).text(function(d) {
                    return d.team + " (scored: " + d.value + ")";
                });

            }, 200);
        };
    });
    // console.log('$attr.data', $attr , $attr.data);
}