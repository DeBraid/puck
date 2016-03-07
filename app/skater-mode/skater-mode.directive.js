
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
/*
	box and whisker examples: 
	http://bl.ocks.org/jensgrubert/7789216
*/

function SkaterModeController($scope, skaterModeServices) {
    $scope.$watch( 'data' , init );

    function init(skater) {
        if (!skater || !skater.length) { return; }
        $scope.skater = skater[0];      
        var logo_path = setTeamImage($scope.skater);
        angular.extend( $scope.skater , logo_path );
        

        var metric = 'GF60';
        // var quartiles = skaterModeServices.quartiles($scope.payload, metric);
        // var extent = skaterModeServices.extent($scope.payload, metric);
        var createRenderData = skaterModeServices.createRenderData($scope.payload, metric);
        // console.log('SkaterMode extent', extent);
        // console.log('SkaterMode quartiles', quartiles);
        $scope.charting_data = createRenderData;
	}
	
	function setTeamImage(skater) {
		var name = skater['Team'].split(' ').join('_');
		var logo_stub = '/assets/images/team-logos/';
		return { logo_path: logo_stub + name + '.svg'};
	}
}

function SkaterModeLink (
    scope, ele, attrs
) {
    scope.$watch( 'charting_data' , function (val) {
        render(val);
    });

    var margin = {top: 10, right: 50, bottom: 20, left: 50},
    width = 120 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var min = Infinity,
        max = -Infinity;

    // var chart = skaterModeServices.box()
    var chart = d3.box()
        .whiskers(iqr(1.5))
        .width(width)
        .height(height);

    // d3.csv("app/skater-mode/morley.csv", function render (error, csv) {
    function render (csv) {
        if (!csv || !csv.length) { return; }
      var data = [];
      console.log('csv', csv);
      csv.forEach(function(x) {
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
      console.log('data', data);
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

      setInterval(function() {
        svg.datum(randomize).call(chart.duration(1000));
      }, 2000);
    };

    function randomize(d) {
      if (!d.randomizer) d.randomizer = randomizer(d);
      return d.map(d.randomizer);
    }

    function randomizer(d) {
      var k = d3.max(d) * .02;
      return function(d) {
        return Math.max(min, Math.min(max, d + k * (Math.random() - .5)));
      };
    }

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

    // var left_margin_from_foo;
    // scope.widerLeftColumn = false;
    // scope.charting_data = [];
    // scope.metrics = [];
    // scope.render = render();
    // scope.setMetricFromListClick = setMetricFromListClick;
    
    // angular.forEach( scope.$parent.metrics , function ( item ) {
    //     scope.metrics.push(item.metric);
    // });
    
    // scope.$on('skater_metrics', function (event, metrics) {
    //     scope.metrics = metrics;
    // });
    
    // scope.$watch('data', updateChartingData);
    // scope.$watch('metric', updateChartingData);
    
    // function updateChartingData(newVal, oldVal) {
    //     var data = scope.data;
    //     if (!data.length) {return;}
    
    //     scope.charting_data.length = 0;    
    //     scope.widerLeftColumn = false;
    //     if ( scope.metrics.indexOf(newVal) > -1 ) {
    //         setChartingData();
    //     }

    //     render(scope.charting_data);
    //     return;

    //     function setChartingData() {
    //         data.map(function (entity) {    
    //             var name; 
    //             if ( entity.Player_Name ) {
    //                 name = entity.Player_Name;
    //                 scope.widerLeftColumn = true;
    //             } else if ( entity.FullName ) {
    //                 name = entity.FullName
    //                 scope.widerLeftColumn = true;
    //             } else {
    //                 name = entity.teamname;
    //             }

    //             scope.charting_data.push({
    //                 metric : newVal,
    //                 value: entity[newVal], 
    //                 entity : name
    //             });
    //         });
    //     }
    // }

    // function render (render_data) {
    //     // console.log('running render with render_data', render_data);
    //     if (!render_data) return;
    //     d3.selectAll('#bar-chart svg').remove();

    //     var renderTimeout;
    //     var margin = parseInt(attrs.margin) || 20,
    //         barHeight = parseInt(attrs.barHeight) || 20,
    //         barPadding = parseInt(attrs.barPadding) || 5; 
        
    //     var left_margin = 175,
    //         my_font_size = 18,
    //         value_text_margin = left_margin*0.7;

    //     if (scope.widerLeftColumn) {
    //         left_margin = 250;
    //         my_font_size = 15;
    //         value_text_margin = left_margin*0.85;
    //     }
        
    //     var svg = d3.select('#bar-chart')
    //         .append('svg').style('width', '100%');

    //     render_data.sort(function(a, b) {
    //         return parseFloat(b.value) - parseFloat(a.value);
    //     });
        
    //     var data_length = render_data.length;
    //     var chart_length = scope.chart_length;
    //     if (chart_length && (chart_length < data_length)) {
    //         render_data.splice(chart_length, data_length - chart_length);
    //     }

    //     if (renderTimeout) clearTimeout(renderTimeout);

    //     renderTimeout = setTimeout(function() {
    //         var container_width = d3.select('#bar-chart-container').node().getBoundingClientRect().width;
    //         var width = container_width - left_margin*0.5,
    //             height = render_data.length * (barHeight + barPadding),
    //             color = d3.scale.category20b(),
    //             min = d3.min(render_data, function(d) { return d.value; }),
    //             max = d3.max(render_data, function(d) { return d.value; });
            
    //         var xScale = d3.scale.linear()
    //                 .domain([min,max])
    //                 .range([left_margin*0.5, width-left_margin]);

    //         svg.attr('height', height);
            
    //         svg.selectAll('rect')
    //         .data(render_data).enter()
    //         .append('rect')
    //         .attr('height', barHeight)
    //         .attr('width', width/2)
    //         .attr('x', left_margin + Math.round(margin / 2))
    //         .attr('y', function(d, i) {
    //             return i * (barHeight + barPadding);
    //         })
    //         .attr('fill', function(d) {
    //             return color(d.value);
    //         })
    //         .transition().duration(1000)
    //         .attr('width', function(d) {
    //             return xScale(d.value);
    //         });
            
    //         svg.selectAll('text.entity')
    //         .data(render_data).enter()
    //         .append('text')
    //         .attr('fill', '#000').attr('y', function(d, i) {
    //             return i * (barHeight + barPadding) + 15;
    //         })
    //         .attr('x', left_margin*0.05)
    //         .text(function(d) {
    //             return d.entity;
    //         })
    //         .style("font-size", my_font_size);

    //         svg.selectAll('text.value')
    //         .data(render_data).enter()
    //         .append('text')
    //         .attr('fill', '#000').attr('y', function(d, i) {
    //             return i * (barHeight + barPadding) + 15;
    //         })
    //         .attr('x', value_text_margin).text(function(d) {
    //             return parseFloat(d.value).toFixed(2);
    //         })
    //         .style("font-size", my_font_size*0.8);

    //     }, 200);
    // };

    // function setMetricFromListClick ($event, met) { 
    //     scope.metric = met;
    // } 
}