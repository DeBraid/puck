
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
            // foo: '=foo',
        },
        link: ScatterPlotLink
    }
}

function ScatterPlotLink (scope, ele, attrs) {
    console.log('ScatterPlotLink scope', scope);
}