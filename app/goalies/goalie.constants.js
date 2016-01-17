
angular
	.module('puckalyticsMainApp.goalies')
	.constant('goalieConstants', {
		metrics : [
			'GP','GA60','SA60','FA60','CA60',
			'GA', 'SA', 'FA', 'CA', 	
			'SvPct','FSvPct','CSvPct'
		]
	}); 