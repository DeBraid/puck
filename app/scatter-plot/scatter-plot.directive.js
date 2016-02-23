
angular
	.module('puckalyticsMainApp.scatterPlot', [
		'ui.router',
        'ui.bootstrap'
	])
	.directive('scatterPlot', ScatterPlotDirective );

function ScatterPlotDirective () {
    return {
        restrict: 'E',
        templateUrl: 'app/scatter-plot/scatter-plot.html',
        scope: {
            data: '=data',
        },
        link: ScatterPlotLink
    }
}

function ScatterPlotLink (scope, ele, attrs) {
    scope.render_data = [];

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    /* 
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */ 

    // setup x 
    var xValue = function(d) { return d.x;}, // data -> value
        xScale = d3.scale.linear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.svg.axis().scale(xScale).orient("bottom");

    // setup y
    var yValue = function(d) { return d.y;}, // data -> value
        yScale = d3.scale.linear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    // setup fill color
    var cValue = function(d) { return d.teamname;},
        color = d3.scale.category10();

    // load data
    // d3.csv("cereal.csv", 

    setData();
    scope.$watch('data', setData);
    scope.$watch('x_metric', setData);
    scope.$watch('y_metric', setData);
    // scope.$watch('render_data', render(scope.render_data));

    function setData() {
        scope.render_data.length = 0;
        var x_data = scope.x_metric;
        var y_data = scope.y_metric;
        // var y_data = 'GF';
        angular.forEach( scope.data , function (d) {
            var datum = {
                teamname : d.teamname,
                x : d[x_data],
                y : d[y_data]
            }
            scope.render_data.push(datum);
        });
        // return render_data;
        render(scope.render_data);
    }
    function render (data) {
      if (!data || data.length < 1) {
        return;
      }
      console.log('data in render', data);

      // adding from above 
      // add the graph canvas to the body of the webpage
        d3.selectAll('#scatter-plot-container svg').remove();
        var chart = d3.select("#scatter-plot-container");
        
        var svg = chart.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // add the tooltip area to the webpage
        var tooltip = chart.append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

      // don't want dots overlapping axis, so add in buffer to data domain
      xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
      yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

      // x-axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Calories");

      // y-axis
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(function (d) {
              return 'Y Value';
          });

      // draw dots
      svg.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", xMap)
          .attr("cy", yMap)
          .style("fill", function(d) { return color(cValue(d));}) 
          .on("mouseover", function(d) {
              tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
              tooltip.html(d["Cereal Name"] + "<br/> (" + xValue(d) 
                + ", " + yValue(d) + ")")
                   .style("left", (d3.event.pageX + 5) + "px")
                   .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function(d) {
              tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
          });

      // draw legend
      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      // draw legend colored rectangles
      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      // draw legend text
      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d;})
    }
}