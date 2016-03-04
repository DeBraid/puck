
angular
    .module('puckalyticsMainApp.setNewMetric', [
        'ui.router', 'ui.bootstrap', 'angular-clipboard'
    ])
    .directive('setNewMetric', setNewMetricDirective);

function setNewMetricDirective($rootScope, $state, $timeout) {
    return {
        restrict: 'E',
        scope: {
            metric: '='
        },
        templateUrl: 'app/set-new-metric/set-new-metric.html',
        link: setNewMetricLinkFn
    }

    function setNewMetricLinkFn (scope) {
        scope.setMetricToChart = setMetricToChart;
        function setMetricToChart(metric) {
            $rootScope.$broadcast('draw_chart_from_table_header_click', metric.API_Name);
        }
    };
}