
angular
	.module('puckalyticsMainApp.skaterMode', [
		'ui.router',
        'ui.bootstrap'
	])
	.directive('skaterMode', SkaterModeDirective );

function SkaterModeDirective () {
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

function SkaterModeController($scope, $state) {
	$scope.$watch( 'data' , init );

	function init(skater) {
		if (!skater || !skater.length) { return; }
		$scope.skater = skater[0];		
		var logo_path = setTeamImage($scope.skater);
		angular.extend( $scope.skater , logo_path );
		
		doMathWithPayload();
	}
	
	function setTeamImage(skater) {
		var name = skater['Team'].split(' ').join('_');
		var logo_stub = '/assets/images/team-logos/';
		return { logo_path: logo_stub + name + '.svg'};
	}

	function doMathWithPayload() {
		console.log('doMathWithPayload(payload)', $scope.payload.length);
		var peer_group = $scope.payload;
		var nested_data = d3.nest()
			.key(function(d) { return d.GF60; })
			.entries(peer_group);
		console.log('nested_data', nested_data);

		// angular.forEach(peer_group, function (player) {
		// 	console.log('player.GF60', player.GF60);
		// });

	}
}

function SkaterModeLink (
    scope, ele, attrs
) {
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