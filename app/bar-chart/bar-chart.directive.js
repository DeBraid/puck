
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
    scope, elem, attrs
) {
    console.log('scope.data', scope.data);
    var data = scope.data;
    scope.title = 'Bar Chart for Teams: Foo';
    scope.metric = 'CFPct';
    scope.submit = function () {
        // console.log('submit data', data[0]);
    }

    scope.$watch('metric', function(newVal, oldVal) {
        var charting_data = [];
        var data = scope.data;
        if (!data.length) {
            console.log('no data.length ');
            return;  
        }
        var metrics = Object.keys(data[0]);
        console.log('metrics', metrics);
        
        if ( metrics.indexOf(newVal) > -1 ) {
            console.log('matching!', newVal );
            data.map(function (team) {

                charting_data.push({
                    metric : newVal,
                    value: team[newVal], 
                    team : team.teamname
                });
            });
            console.log('charting_data', charting_data);
            drawChart(charting_data);
        }

        function drawChart (data) {
            console.log('data in drawChart', data);
            console.log('d3 in drawChart', d3);
            var svg = d3.select('#bar-chart');
            console.log('svg', svg);
            // svg.append("svg");
        }


    });
    // console.log('$attr.data', $attr , $attr.data);
}