
angular
	.module('puckalyticsMainApp.teams')
	.constant('teamsConstants', {	
		team_metrics_arr: [
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
			{metric : 'SHPct' 	, filter : 'displayGoals' 	, decimal : '2'},
			{metric : 'SVPct' 	, filter : 'displayGoals' 	, decimal : '2'},
			{metric : 'PDO' 	, filter : 'displayGoals' 	, decimal : '2'},
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
			{metric : 'NZPct' 	, filter : 'displayZoneStarts' 	, decimal : '2'},
			{metric : 'DZPct' 	, filter : 'displayZoneStarts' 	, decimal : '2'},
			{metric : 'OZPct' 	, filter : 'displayZoneStarts' 	, decimal : '2'},
		],
		team_colours: {
			'Boston': [
				'#2C2A29',
				'#FFB81C',
				'#FFFFFF',
			],
			'Calgary': [
				'#C8102E',
				'#F1BE48',
				'#2C2A29',
			],
			'Carolina': [
				'#C8102E',
				'#2C2A29',
				'#8A8D8F',
			],
			'Chicago': [
				'#C8102E',
				'#2C2A29',
				'#FFF'
			],
		}
});
		