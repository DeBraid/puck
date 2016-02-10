
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
    scope.render = render();
    scope.metric = 'CFPct';
    scope.title = 'Charting ' + scope.metric;
    // scope.submit = function () {
    //     // console.log('submit data', data[0]);
    // }
    scope.$watch('charting_data', function(newVal, oldVal) {
        console.log('charting_data newVal', newVal);
        render(newVal)
    });    

    scope.$watch('metric', function(newVal, oldVal) {
        
        if (newVal == '') {
            console.log('set array to zero; abort.');
            scope.charting_data.length = 0;
            render(scope.charting_data);
            return;
        }
        
        var data = scope.data;
        if (!data.length) {return;}
        var metrics = Object.keys(data[0]);
        // if (!metrics) {return;}
        // console.log('metrics', metrics);
        
        if ( metrics.indexOf(newVal) > -1 ) {
            scope.charting_data.length = 0;
            data.map(function (team) {
                scope.charting_data.push({
                    metric : newVal,
                    value: team[newVal], 
                    team : team.teamname
                });
            });
            // drawChart(scope.charting_data);
            console.log('scope.charting_data', scope.charting_data);
            render(scope.charting_data);
        }

    });

    function render (render_data) {
        console.log('running render with render_data', render_data);

        var renderTimeout;
        scope.reversed = false; 
        var margin = parseInt(attrs.margin) || 20,
            barHeight = parseInt(attrs.barHeight) || 20,
            barPadding = parseInt(attrs.barPadding) || 5;
        
        d3.selectAll('svg').remove();

        var svg = d3.select('#bar-chart')
            .append('svg').style('width', '100%');
            console.log('svg', svg);

        // svg.selectAll('svg').remove();
        
        if (!render_data) return;
        if (renderTimeout) clearTimeout(renderTimeout);
      
        // render_data.sort(function(a, b) {
        //     console.log('a in sort', a, 'b in sort', b);
        // });
        render_data.sort(function(a, b) {
            if (scope.reversed) {
                return parseFloat(a.value) - parseFloat(b.value);    
            } else {
                return parseFloat(b.value) - parseFloat(a.value);
            }
        });

        renderTimeout = setTimeout(function() {
            
            var width = d3.select('#bar-chart-container').node().getBoundingClientRect().width,
                height = render_data.length * (barHeight + barPadding),
                color = d3.scale.category20b(),
                min = d3.min(render_data, function(d) { return d.value; }),
                max = d3.max(render_data, function(d) { return d.value; });
            var left_margin = 175;
            var xScale = d3.scale.linear()
                    .domain([min,max])
                    .range([left_margin, width-left_margin]);

            svg.attr('height', height);
            
            svg.selectAll('rect')
            .data(render_data).enter()
            .append('rect').on('click', function(d, i) {
                return scope.onClick({
                    item: d
                });
            })
            .attr('height', barHeight)
            .attr('width', width/2)
            .attr('x', left_margin + Math.round(margin / 2))
            .attr('y', function(d, i) {
                return i * (barHeight + barPadding);
            })
            .attr('fill', function(d) {
                return color(d.value);
            })
            .transition().duration(1000).attr('width', function(d) {
                return xScale(d.value);
            });
            
            svg.selectAll('text.team')
            .data(render_data).enter().append('text')
            .attr('fill', '#000').attr('y', function(d, i) {
                return i * (barHeight + barPadding) + 15;
            })
            .attr('x', left_margin*0.05).text(function(d) {
                return d.team;
            })
            .style("font-size","18px");

            svg.selectAll('text.value')
            .data(render_data).enter().append('text')
            .attr('fill', '#000').attr('y', function(d, i) {
                return i * (barHeight + barPadding) + 15;
            })
            .attr('x', left_margin*0.7).text(function(d) {
                return parseFloat(d.value).toFixed(2);
            })
            .style("font-size","15px");

        }, 200);
    };
    // console.log('$attr.data', $attr , $attr.data);
}