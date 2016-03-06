// Main JS file 
var app = angular.module('puckalyticsMainApp', [
	'puckalyticsMainApp.getData',
	'puckalyticsMainApp.getParamsFromUrl',
	'puckalyticsMainApp.skaters',
	'puckalyticsMainApp.skaterMode',
	'puckalyticsMainApp.goalies',
	'puckalyticsMainApp.teams',
	'puckalyticsMainApp.filterMenu',
	'puckalyticsMainApp.barChart',
	'puckalyticsMainApp.scatterPlot',
	'puckalyticsMainApp.copyUrl',
	'puckalyticsMainApp.setNewMetric',
	'puckalyticsMainApp.homepage',
	'ui.router',
	'ui.bootstrap',
	'ngAdsense',
	'ui.bootstrap'
]);