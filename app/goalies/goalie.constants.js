
angular
	.module('puckalyticsMainApp.goalies')
	.constant('goalieConstants', {
		goalie_metrics_object : [
			{metric : 'GP' 		, decimal : '0'},
			{metric : 'GA' 		, decimal : '0'},
			{metric : 'SA' 		, decimal : '0'},
			{metric : 'FA' 		, decimal : '0'},
			{metric : 'CA' 		, decimal : '0'},
			{metric : 'GA60' 	, decimal : '2'},
			{metric : 'SA60' 	, decimal : '2'},
			{metric : 'FA60' 	, decimal : '2'},
			{metric : 'CA60' 	, decimal : '2'},
			{metric : 'SvPct' 	, decimal : '2'},
			{metric : 'FSvPct' 	, decimal : '2'},
			{metric : 'CSvPct' 	, decimal : '2'},
		]
	}); 
	
