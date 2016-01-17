// Main JS file 
var app = angular.module('puckalyticsMainApp', [
	'puckalyticsMainApp.getData',
	'puckalyticsMainApp.getParamsFromUrl',
	'puckalyticsMainApp.goalies',
	'puckalyticsMainApp.teams',
	'puckalyticsMainApp.filterMenu',
	'puckalyticsMainApp.homepage',
	'ui.router',
	'ui.bootstrap'
]);