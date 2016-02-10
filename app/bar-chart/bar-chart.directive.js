
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
    scope.charting_data = [];
    scope.render = render();
    scope.metric = '';
    // scope.onClick = function (clicked) {
    //     console.log('clicked', clicked);
    // }

    scope.$watch('metric', updateChartingData);
    
    function updateChartingData(newVal, oldVal) {
        scope.charting_data.length = 0;
        
        var data = scope.data;
        if (!data.length) {return;}
        var metrics = Object.keys(data[0]);
        
        if ( metrics.indexOf(newVal) > -1 ) {
            
            data.map(function (team) {    
                scope.charting_data.push({
                    metric : newVal,
                    value: team[newVal], 
                    team : team.teamname
                });
            });
        }

        render(scope.charting_data);
        return;
    }

    function render (render_data) {
        console.log('running render with render_data', render_data);
        if (!render_data) return;
        d3.selectAll('svg').remove();

        var renderTimeout;
        var margin = parseInt(attrs.margin) || 20,
            barHeight = parseInt(attrs.barHeight) || 20,
            barPadding = parseInt(attrs.barPadding) || 5;
        
        var svg = d3.select('#bar-chart')
            .append('svg').style('width', '100%');

        render_data.sort(function(a, b) {
            return parseFloat(b.value) - parseFloat(a.value);
        });

        if (renderTimeout) clearTimeout(renderTimeout);

        renderTimeout = setTimeout(function() {
            var left_margin = 175;
            var container_width = d3.select('#bar-chart-container').node().getBoundingClientRect().width;
            var width = container_width - left_margin*0.5,
                height = render_data.length * (barHeight + barPadding),
                color = d3.scale.category20b(),
                min = d3.min(render_data, function(d) { return d.value; }),
                max = d3.max(render_data, function(d) { return d.value; });
            
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
            .transition().duration(1000)
            .attr('width', function(d) {
                return xScale(d.value);
            });
            
            svg.selectAll('text.team')
            .data(render_data).enter()
            .append('text')
            .attr('fill', '#000').attr('y', function(d, i) {
                return i * (barHeight + barPadding) + 15;
            })
            .attr('x', left_margin*0.05)
            .text(function(d) {
                return d.team;
            })
            .style("font-size","18px");

            svg.selectAll('text.value')
            .data(render_data).enter()
            .append('text')
            .attr('fill', '#000').attr('y', function(d, i) {
                return i * (barHeight + barPadding) + 15;
            })
            .attr('x', left_margin*0.7).text(function(d) {
                return parseFloat(d.value).toFixed(2);
            })
            .style("font-size","15px");

        }, 200);
    };
}