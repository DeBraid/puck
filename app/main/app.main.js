// Main JS file 
var app = angular.module('puckalyticsMainApp', [
	// 'puckalyticsMainApp.secrets',
	'puckalyticsMainApp.getData',
	'puckalyticsMainApp.getParamsFromUrl',
	'puckalyticsMainApp.skaters',
	'puckalyticsMainApp.goalies',
	'puckalyticsMainApp.teams',
	'puckalyticsMainApp.filterMenu',
	'puckalyticsMainApp.homepage',
	'ui.router',
	'ui.bootstrap'
]);