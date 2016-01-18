
angular
	.module('puckalyticsMainApp.teams')
	.constant('teamsConstants', {	
		team_metrics_object: [
			{metric : 'GF' 		, filter : 'displayGoals' 	, decimal : '0'},
			{metric : 'GA' 		, filter : 'displayGoals' 	, decimal : '0'},
			{metric : 'GF60'	, filter : 'displayGoals' 	, decimal : '2'},
			{metric : 'GA60' 	, filter : 'displayGoals' 	, decimal : '2'},
			{metric : 'GFPct' 	, filter : 'displayGoals' 	, decimal : '2'},
			{metric : 'SF' 		, filter : 'displayShots' 	, decimal : '0'},
			{metric : 'SA' 		, filter : 'displayShots' 	, decimal : '0'},
			{metric : 'SF60'	, filter : 'displayShots' 	, decimal : '2'},
			{metric : 'SA60'	, filter : 'displayShots' 	, decimal : '2'},
			{metric : 'SFPct'	, filter : 'displayShots' 	, decimal : '2'},
			{metric : 'FF' 		, filter : 'displayFenwick' 	, decimal : '0'},
			{metric : 'FA' 		, filter : 'displayFenwick' 	, decimal : '0'},
			{metric : 'FF60' 	, filter : 'displayFenwick' 	, decimal : '2'},
			{metric : 'FA60' 	, filter : 'displayFenwick' 	, decimal : '2'},
			{metric : 'FFPct' 	, filter : 'displayFenwick' 	, decimal : '2'},
			{metric : 'FSHPct' 	, filter : 'displayFenwick' 	, decimal : '2'},
			{metric : 'FSVPct' 	, filter : 'displayFenwick' 	, decimal : '2'},
			{metric : 'FPDO' 	, filter : 'displayFenwick' 	, decimal : '2'},
			{metric : 'CF' 		, filter : 'displayCorsi' 	, decimal : '0'},
			{metric : 'CA' 		, filter : 'displayCorsi' 	, decimal : '0'},
			{metric : 'CF60' 	, filter : 'displayCorsi' 	, decimal : '2'},
			{metric : 'CA60' 	, filter : 'displayCorsi' 	, decimal : '2'},
			{metric : 'CFPct' 	, filter : 'displayCorsi' 	, decimal : '2'},
			{metric : 'CSHPct' 	, filter : 'displayCorsi' 	, decimal : '2'},
			{metric : 'CSVPct' 	, filter : 'displayCorsi' 	, decimal : '2'},
			{metric : 'CPDO' 	, filter : 'displayCorsi' 	, decimal : '2'},
			{metric : 'SHPct' 	, filter : 'displayShots || displayGoals' 	, decimal : '2'},
			{metric : 'SVPct' 	, filter : 'displayShots || displayGoals' 	, decimal : '2'},
			{metric : 'PDO' 	, filter : 'displayShots || displayGoals' 	, decimal : '2'},
			{metric : 'NZPct' 	, filter : 'displayZoneStarts' 	, decimal : '2'},
			{metric : 'DZPct' 	, filter : 'displayZoneStarts' 	, decimal : '2'},
			{metric : 'OZPct' 	, filter : 'displayZoneStarts' 	, decimal : '2'},
		]
});
		