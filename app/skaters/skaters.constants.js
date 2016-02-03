
angular
	.module('puckalyticsMainApp.skaters')
	.constant('skatersConstants', {
		section_options : [
			{
				name : 'info',
				value : 1,
				order_by : ''
			},{
				name : 'goal',
				value : 0,
				order_by : 'GFPct'
			},{
				name : 'shot',
				value : 0,
				order_by : 'SFPct'
			},{
				name : 'fenwick',
				value : 0,
				order_by : 'FFPct'
			},{
				name : 'corsi',
				value : 1,
				order_by : 'CFPct'
			},{
				name : 'pcts',
				value : 0,
				order_by : ''
			},{
				name : 'pctteam',
				value : 0,
				order_by : 'TeamGFPct'
			},
			// {
			// 	name : 'individual',
			// 	value : 0,
			// 	order_by : ''
			// },
			// {
			// 	name : 'faceoffs',
			// 	value : 0,
			// 	order_by : ''
			// }
		]
	}); 