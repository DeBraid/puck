
angular
	.module('puckalyticsMainApp.barChart', [
		'ui.router',
        'ui.bootstrap',
        'puckalyticsMainApp.teams'
	])
	.directive('barChart', [ 'teamsConstants', BarChartDirective] );

function BarChartDirective () {
    return {
        restrict: 'E',
        templateUrl: 'app/bar-chart/bar-chart.html',
        scope: {
            data: '=data',
        },
        link: BarChartLink,
        controller: BarChartController,
    }
}

function BarChartController($scope, $state, teamsConstants) {
    $scope.show_bar_chart = false;
    $scope.team_colours = teamsConstants.team_colours;
    var section = $scope.section_name = $state.current.name;
    $scope.chart_length = (section == 'teams') ? 30 : 10;

    $scope.$on('draw_chart_from_table_header_click', function (event, value) {        
        $scope.show_bar_chart = true;
        $scope.metric = value;
    });
    $scope.$on('skater_metrics', function (event, metrics) {
        $scope.metrics = metrics;
    });

    $scope.toggleChartOptions = function () {
        $scope.show_bar_chart = !$scope.show_bar_chart;
    }
}

function BarChartLink (
    scope, ele, attrs
) {
    scope.widerLeftColumn = false;
    scope.charting_data = [];
    scope.metrics = [];
    scope.render = render();
    scope.setMetricFromListClick = setMetricFromListClick;
    
    angular.forEach( scope.$parent.metrics , function ( item ) {
        scope.metrics.push(item.metric);
    });
    
    scope.$watch('data', updateChartingData);
    scope.$watch('metric', updateChartingData);
    scope.$watch('chart_length', function () {
        updateChartingData(scope.metric);
    });
    
    function updateChartingData(newVal, oldVal) {
        var data = scope.data;
        if (!data.length) {return;}
        // console.log('updateChartingData newVal', newVal);
        scope.charting_data.length = 0;    
        scope.widerLeftColumn = false;

        if ( scope.metrics.indexOf(newVal) > -1 ) {
            setChartingData();
        }

        render(scope.charting_data);
        return;

        function setChartingData() {
            var colours = scope.team_colours;
            data.map(function (entity) {    
                var name, team, fill, stroke; 
                if ( entity.Player_Name ) {
                    name = entity.Player_Name;
                    team = entity.Team;
                    scope.widerLeftColumn = true;
                } else if ( entity.FullName ) {
                    name = entity.FullName
                    team = entity.Team;
                    scope.widerLeftColumn = true;
                } else {
                    name = team = entity.teamname;
                }

                scope.charting_data.push({
                    metric : newVal,
                    value: entity[newVal], 
                    entity : name,
                    team : team,
                    fill : colours[team][0],
                    stroke : colours[team][1]
                });
            });
        }
    }

    function render (render_data) {
        // console.log('running render with render_data', render_data);
        if (!render_data) return;
        d3.selectAll('#bar-chart svg').remove();

        var renderTimeout;
        var margin = parseInt(attrs.margin) || 20,
            barHeight = parseInt(attrs.barHeight) || 20,
            barPadding = parseInt(attrs.barPadding) || 5; 
        
        var left_margin = 200,
            my_font_size = 18,
            value_text_margin = left_margin*0.7;

        if (scope.widerLeftColumn) {
            left_margin = 265;
            my_font_size = 15;
            value_text_margin = left_margin*0.85;
        }
        
        var svg = d3.select('#bar-chart')
            .append('svg').style('width', '100%');

        render_data.sort(function(a, b) {
            return parseFloat(b.value) - parseFloat(a.value);
        });
        
        var data_length = render_data.length;
        var chart_length = scope.chart_length;

        if (chart_length && (chart_length < data_length)) {
            render_data.splice(chart_length, data_length - chart_length);
        }

        if (renderTimeout) clearTimeout(renderTimeout);

        renderTimeout = setTimeout(function() {
            var container_width = d3.select('#bar-chart-container').node().getBoundingClientRect().width;
            var width = container_width - left_margin*0.5,
                height = render_data.length * (barHeight + barPadding),
                color = d3.scale.category20b(),
                min = d3.min(render_data, function(d) { return d.value; }),
                max = d3.max(render_data, function(d) { return d.value; });
            
            var xScale = d3.scale.linear()
                    .domain([min,max])
                    .range([left_margin*0.5, width-left_margin]);

            svg.attr('height', height);
            
            function customColours(colours, n) {
                // var colours_arr = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00", "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
                var colours_arr = colours;
                return colours_arr[n % colours_arr.length];
            }
            svg.selectAll('rect')
            .data(render_data).enter()
            .append('rect')
            .attr('height', barHeight)
            .attr('width', width/2)
            .attr('x', left_margin + Math.round(margin / 2))
            .attr('y', function(d, i) {
                return i * (barHeight + barPadding);
            })
            .attr('fill', '#FFF')
            .attr('stroke', '#000')
            .transition().duration(1000)
            .attr('width', function(d) {
                return xScale(d.value);
            })
            .attr('fill', function(d) {
                return  d.fill;
            })
            .attr('stroke-opacity', '0.9')
            .attr('fill-opacity', '0.55')
            .attr('stroke', function(d) {
                return  d.stroke;
            });

            svg.selectAll('.logos')
            .data(render_data).enter()
            .append('svg:image')
            .attr("xlink:href", function (d) { 
                var full_logo_path = setLogoPath(d);
                return full_logo_path; 
            })
            .attr('width', 40)
            .attr('height', 40)
            .attr('x', left_margin + Math.round(margin / 2))
            .attr('y', function(d, i) {
                return (i * (barHeight + barPadding)) - 10;
            })
            .transition().duration(1000)
            .attr('x', function(d) {
                return xScale(d.value) + left_margin + Math.round(margin / 2);
            });

            svg.selectAll('text.entity')
            .data(render_data).enter()
            .append('text')
            .attr('y', function(d, i) {
                return i * (barHeight + barPadding) + 15;
            })
            .attr('x', left_margin*0.05)
            .text(function(d, i) {
                var rank = i + 1;
                return rank + '. ' + d.entity;
            })
            .on('click', function (player, arg) {
                var name = player.entity;
                scope.$emit('set_skater_mode_from_barchart', name);
            })
            .on("mouseover", function(d) {
                d3.select(this).style("text-decoration", "underline");
            })
            .on("mouseout", function(d) {
                d3.select(this).style("text-decoration", "none");
            })
            .style({
                "font-size": my_font_size,
                "fill": '#337ab7',
                "cursor": 'pointer',
            });

            svg.selectAll('text.value')
            .data(render_data).enter()
            .append('text')
            .attr('fill', '#000')
            .attr('y', function(d, i) {
                return i * (barHeight + barPadding) + 15;
            })
            .attr('x', value_text_margin).text(function(d) {
                return parseFloat(d.value).toFixed(2);
            })
            .style("font-size", my_font_size*0.8);

        }, 200);

        function setLogoPath(d) {
            var logo_path = 'assets/images/team-logos/';
            var team = d.team ? d.team : d.entity;
            return logo_path + team.split(' ').join('_') + '.svg';
        }
    };

    function setMetricFromListClick ($event, met) { 
        scope.metric = met;
    } 
}