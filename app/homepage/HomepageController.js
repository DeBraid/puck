
angular
	.module('puckalyticsMainApp.homepage', [
		'ui.router', 
		'ui.bootstrap'
	])
	.controller('HomepageController', HomepageController );

function HomepageController (homepageConstants) {
	var self = this;
	self.sections = homepageConstants.sections;
}