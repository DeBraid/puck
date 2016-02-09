
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
    scope.title = 'Bar Chart for Teams: Foo';
    scope.metric = 'CFPct';
    scope.submit = function () {
        console.log('drawNewChart metric', scope.metric);
    }


    scope.$watch('metric', function(newVal, oldVal) {
        // console.log('metric watcher: old' oldVal, 'new', newVal);
        console.log('metric', newVal, oldVal);
    });
    console.log('scope', scope.data);
    // console.log('$attr.data', $attr , $attr.data);
}