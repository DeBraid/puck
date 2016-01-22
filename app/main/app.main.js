// Main JS file 
var app = angular.module('puckalyticsMainApp', [
	// 'puckalyticsMainApp.secrets',
	'puckalyticsMainApp.getData',
	'puckalyticsMainApp.getParamsFromUrl',
	'puckalyticsMainApp.goalies',
	'puckalyticsMainApp.teams',
	'puckalyticsMainApp.filterMenu',
	'puckalyticsMainApp.copyUrl',
	'puckalyticsMainApp.homepage',
	'ui.router',
	'ui.bootstrap'
]);