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
    scope.render_data = [];
    scope.setMetricFromListClick = setMetricFromListClick;
    // scope.metric
    scope.metrics = scope.$parent.metrics;
    var margin = {
        top: 20,
        right: 100,
        bottom: 30,
        left: 50
    },
    height = 500 - margin.top - margin.bottom;
    // setup fill color
    var cValue = function(d) { return d.teamname;},
        color = d3.scale.category20b();
    
    setData();
    scope.$watch('data', setData);
    scope.$watch('x_metric', setData);
    scope.$watch('y_metric', setData);
    
    function setData() {
        scope.render_data.length = 0;
        var x_data = scope.x_metric;
        var y_data = scope.y_metric;
        // var y_data = 'GF';
        angular.forEach(scope.data, function(d) {
            var datum = {
                teamname: d.teamname,
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
        var width = chart.node().getBoundingClientRect().width;
        
        // setup x
        var xValue = function(d) { return d.x; },
            xScale = d3.scale.linear().range([0, width]),
            xMap = function(d) { return xScale(xValue(d)); }, 
            xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");
        // setup y
        var yValue = function(d) { return d.y; }, 
            yScale = d3.scale.linear().range([height, 0]), 
            yMap = function(d) { return yScale(yValue(d)); },
            yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

        var svg = chart.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // add the tooltip area to the webpage
        var tooltip = chart.append("div")
            .attr("class", "tooltip").style("opacity", 0);
        // don't want dots overlapping axis, so add in buffer to data domain
        xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
        yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);
        
        // x-axis
        svg.append("g").attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text").attr("class", "label")
            .attr("x", width).attr("y", -6)
            .style("text-anchor", "end")
            .text(function(d) {
                return scope.x_metric;
            });
        // y-axis
        svg.append("g").attr("class", "y axis")
            .call(yAxis)
            .append("text").attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6).attr("dy", ".71em")
            .style("text-anchor", "end")
            .text(function(d) {
                return scope.y_metric;
            });
        
        // draw dots
        svg.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", 3.5).attr("cx", xMap).attr("cy", yMap).style("fill", function(d) {
            return color(cValue(d));
        }).on("mouseover", function(d) {
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d) + ", " + yValue(d) + ")").style("left", (d3.event.pageX + 5) + "px").style("top", (d3.event.pageY - 28) + "px");
        }).on("mouseout", function(d) {
            tooltip.transition().duration(500).style("opacity", 0);
        });
        // draw legend
        var legend = svg.selectAll(".legend").data(color.domain()).enter().append("g").attr("class", "legend").attr("transform", function(d, i) {
            return "translate(0," + i * 20 + ")";
        });
        // draw legend colored rectangles
        legend.append("rect").attr("x", width - 18).attr("width", 18).attr("height", 18).style("fill", color);
        // draw legend text
        legend.append("text").attr("x", width - 24).attr("y", 9).attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
            return d;
        })
    }

    // function setMetricFromListClick ($event, met) { 
    //     scope.metric = met;
    // } 
    function setMetricFromListClick ($event, met, axis_metric) { 
        console.log('axis_metric', axis_metric);
        scope[axis_metric] = met;
    } 
}