angular
    .module('puckalyticsMainApp.scatterPlot', [
        'ui.router', 'ui.bootstrap'
    ])
    .directive('scatterPlot', ScatterPlotDirective);

function ScatterPlotDirective() {
    return {
        restrict: 'E',
        templateUrl: 'app/scatter-plot/scatter-plot.html',
        scope: {
            data: '=data',
        },
        link: ScatterPlotLink,
        controller: ScatterPlotController
    }
}

function ScatterPlotController ($scope) {
    $scope.show_scatter_plot = true;
    $scope.toggleScatterPlot = function () {
        $scope.show_scatter_plot = !$scope.show_scatter_plot;
    }
}
function ScatterPlotLink(scope, ele, attrs) {
    var logo_path = 'assets/images/team-logos/';
    scope.render_data = [];
    scope.setMetricFromListClick = setMetricFromListClick;
    scope.metrics = scope.$parent.metrics;
    scope.x_metric = 'GFPct';
    scope.y_metric = 'CFPct';

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 30
    };
    var cValue = function(d) { return d.entity;},
        color = d3.scale.category20b();
    
    setData();
    scope.$watch('data', setData);
    scope.$watch('x_metric', setData);
    scope.$watch('y_metric', setData);
    
    function setData() {
        scope.render_data.length = 0;
        var x_data = scope.x_metric;
        var y_data = scope.y_metric;
        angular.forEach(scope.data, function(d) {
            var entity = d.teamname;
            var datum = {
                entity: entity,
                x: d[x_data],
                y: d[y_data]
            }
            scope.render_data.push(datum);
        });
        // return render_data;
        render(scope.render_data);
    }

    function render(data) {
        if (!data || data.length < 1) {return;}
        if (!scope.x_metric || !scope.y_metric) {return;}
        d3.selectAll('#scatter-plot-container svg').remove();

        var chart = d3.select("#scatter-plot-container");
        var width = chart.node().getBoundingClientRect().width - margin.right - margin.left;
        var height = 500 - margin.top - margin.bottom;
        // setup x
        var xValue = function(d) { return d.x; },
            xScale = d3.scale.linear().range([0, width]),
            xMap = function(d) { return xScale(xValue(d)); }, 
            xAxis = d3.svg.axis()
                .scale(xScale)
                .tickSize(1)
                .orient("bottom");
        // setup y
        var yValue = function(d) { return d.y; }, 
            yScale = d3.scale.linear().range([height, 0]), 
            yMap = function(d) { return yScale(yValue(d)); },
            yAxis = d3.svg.axis()
                .scale(yScale)
                .tickSize(1)
                .orient("left");

        var svgTransform = "translate(" + margin.left + "," + margin.top + ")";
        var svg = chart.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", svgTransform);
        // add the tooltip area to the webpage
        var tooltip = chart.append("div")
            .attr("class", "tooltip").style("opacity", 0);
        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue)*0.95, d3.max(data, xValue)*1.05]);
        yScale.domain([d3.min(data, yValue)*0.98, d3.max(data, yValue)*1.02]);
        
        // x-axis
        svg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text").attr("class", "label")
            .attr("x", width).attr("y", -6)
            .style({
                "text-anchor" : "end",
                "font-size" : "25",
            })
            .text(function(d) {
                return scope.x_metric;
            });

        // y-axis
        svg.append("g").attr("class", "y axis")
            .call(yAxis)
            .append("text").attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6).attr("dy", ".71em")
            .style({
                "text-anchor" : "end",
                "font-size" : "25",
            })
            .text(function(d) {
                return scope.y_metric;
            });

        // FIXME DB -- style the axes like the alert (maybe a bad idea...)
        svg.selectAll('.axis')
            .attr({
                'stroke' : '#8a6d3b',
                'fill' : '#faebcc',
                'shape-rendering' : 'crispEdges',
            });
            
        // draw logos via svgs
        svg.selectAll(".logos")
            .data(data)
            .enter().append("svg:image")
            .attr("xlink:href", function (d) { 
                var name = d.entity.split(' ').join('_');
                var full_logo_path = logo_path + name + '.svg';
                return full_logo_path; 
            })
            .attr("x", xMap)
            .attr("y", yMap)
            .attr('width', 40)
            .attr('height', 40)
            .on("mouseover", function(d) {
                
                tooltip.transition()
                    .duration(200).style("opacity", .9);
            
                var tooltip_html = "<h3>" + d.entity+ "</h3>" +
                    "<h5>" + scope.x_metric + ": " + xValue(d) + "</h5>" +
                    "<h5>" + scope.y_metric + ": " + yValue(d).toFixed(2)+ "</h5>";

                tooltip.html(tooltip_html)
                    .style("left", (d3.event.pageX + 5 ) + "px")
                    .style("top", (d3.event.pageY - (height + 15)) + "px");
            })
            .on("mouseout", function(d) {
                tooltip.transition().duration(500).style("opacity", 0);
            });
    }

    function setMetricFromListClick ($event, met, axis_metric) { 
        // console.log('axis_metric', axis_metric);
        scope[axis_metric] = met;
    } 
}