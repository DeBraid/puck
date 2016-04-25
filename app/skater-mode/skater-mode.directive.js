    
angular
	.module('puckalyticsMainApp.skaterMode', [
		'ui.router',
        'ui.bootstrap',
        'puckalyticsMainApp.skaterMode',
        'puckalyticsMainApp.teams',
	])
	.directive('skaterMode', [ 'teamsConstants', SkaterModeDirective ] );

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

function SkaterModeController(
    $scope, $sce, skaterModeServices, teamsConstants
) {
    $scope.navigateToTeam = navigateToTeam;

    $scope.team_colours = teamsConstants.team_colours;
    $scope.$watch( 'data' , init );
    $scope.$on( 'update_order_by_field' , function ($event, val) {
        var metrics = $scope.metrics = [val];
        $scope.charting_data = skaterModeServices.createRenderData($scope.payload, metrics);
    });
    
    function init(skater) {
        if (!skater || !skater.length) { return; }
        $scope.skater = skater[0];              
        $scope.skater.logo_path = setTeamImage($scope.skater);
        $scope.skater.headshot = setSkaterHeadshot($scope.skater.Player_Name);
        
        var metrics = $scope.metrics = ['GFPct'];        
        $scope.charting_data = skaterModeServices.createRenderData($scope.payload, metrics);
	}

    function navigateToTeam($event, team) {
        $scope.$emit('search_for_team', team);
    }
	
	function setTeamImage(skater) {
		var name = skater['Team'].split(' ').join('_');
		var logo_stub = 'assets/images/team-logos/';
		return logo_stub + name + '.svg';
	}

    function setSkaterHeadshot(name) {
        var base_img_src = 'http://tsnimages.tsn.ca/ImageProvider/PlayerHeadshot?seoId=';
        var name_src = name.replace(/\s+/g, '-');
        var src = base_img_src + name_src;
        return $sce.trustAsResourceUrl(src);
    }
}

function SkaterModeLink (
    scope, ele, attrs, skaterModeServices
) {
    scope.$watch( 'charting_data' , function (val) {
        // console.log('watcher for charting_data GO!');
        render(val);
    });

    var fill, stroke;
    var margin = {top: 20, right: 40, bottom: 20, left: 40 },
        width = 225 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var min = Infinity,
        max = -Infinity;

    var chart = d3.box()
        .whiskers(iqr(1.5))
        .width(width/2)
        .height(height);
    
    d3.select('#skater-marker-placeholder')
        .append('svg')
        .attr({ height: 30 , width: 30 })
        .append('circle')
        .attr({
            'id' : 'skater-marker',
            'cx' : '15',
            'cy' : '15',
            'r' : '7.5',
        });          

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

        var chart_metric = scope.chart_metric = scope.metrics[0];
        var skater_val = scope.skater_val = scope.skater[chart_metric];
        var skater_name = scope.skater.Player_Name;
        var team = scope.skater.Team;
        var colours = scope.team_colours[team];
        fill = colours[0];
        stroke = colours[1];
        var chart_container = '#box-and-whisker-container';
        var container = d3.select(chart_container);

        container
            .selectAll('svg').remove();

        var svg = container.selectAll('svg')
            .data(data)
            .enter().append('svg')
            .attr('class', 'box')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.bottom + margin.top)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .call(chart);

        d3.selectAll('.box')
            .data([skater_val])
                .append('circle')
                .attr({
                    'id' : 'skater-marker',
                    'r' : '7.5', 
                })
                .attr('cx', chart.width()/2+margin.left)
                .attr('cy', function(d){
                    // using same scale as box plot.
                    return chart.x1(d) + margin.top;
                });

        d3.selectAll('#skater-marker')
            .style({ 
                'fill': fill, 
                'fill-opacity': '0.8',
                'stroke': stroke,
                'stroke-width': '4px',
                'stroke-opacity': '0.65'
            }); 

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