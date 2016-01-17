
angular
	.module('puckalyticsMainApp.teams')
	.constant('teamsConstants', {	
		team_metrics_object: [
			{metric : 'GF' 		, filter : 'displayGoals' },
			{metric : 'GA' 		, filter : 'displayGoals' },
			{metric : 'GF60'	, filter : 'displayGoals' },
			{metric : 'GA60' 	, filter : 'displayGoals' },
			{metric : 'GFPct' 	, filter : 'displayGoals' },
			{metric : 'SF' 		, filter : 'displayShots' },
			{metric : 'SA' 		, filter : 'displayShots' },
			{metric : 'SF60'	, filter : 'displayShots' },
			{metric : 'SA60'	, filter : 'displayShots' },
			{metric : 'SFPct'	, filter : 'displayShots' },
			{metric : 'FF' 		, filter : 'displayFenwick' },
			{metric : 'FA' 		, filter : 'displayFenwick' },
			{metric : 'FF60' 	, filter : 'displayFenwick' },
			{metric : 'FA60' 	, filter : 'displayFenwick' },
			{metric : 'FFPct' 	, filter : 'displayFenwick' },
			{metric : 'FSHPct' 	, filter : 'displayFenwick' },
			{metric : 'FSVPct' 	, filter : 'displayFenwick' },
			{metric : 'FPDO' 	, filter : 'displayFenwick' },
			{metric : 'CF' 		, filter : 'displayCorsi' },
			{metric : 'CA' 		, filter : 'displayCorsi' },
			{metric : 'CF60' 	, filter : 'displayCorsi' },
			{metric : 'CA60' 	, filter : 'displayCorsi' },
			{metric : 'CFPct' 	, filter : 'displayCorsi' },
			{metric : 'CSHPct' 	, filter : 'displayCorsi' },
			{metric : 'CSVPct' 	, filter : 'displayCorsi' },
			{metric : 'CPDO' 	, filter : 'displayCorsi' },
			{metric : 'SHPct' 	, filter : 'displayShots || displayGoals' },
			{metric : 'SVPct' 	, filter : 'displayShots || displayGoals' },
			{metric : 'PDO' 	, filter : 'displayShots || displayGoals' },
			{metric : 'NZPct' 	, filter : 'displayZoneStarts' },
			{metric : 'DZPct' 	, filter : 'displayZoneStarts' },
			{metric : 'OZPct' 	, filter : 'displayZoneStarts' },
		]
});
		