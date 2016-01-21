
angular
	.module('puckalyticsMainApp.homepage')
	.constant('homepageConstants', {
		sections: [
			{
				sref : 'skaters' ,
				title : 'Skater Stats',
				desc : 'Every skater (FWD and D): Goals, Shots, Fenwick, Corsi, and derivatives',
			},
			{
				sref : 'goalies' ,
				title : 'Goalie Stats',
				desc : 'Keepers: GA, SA, FA, CA, GA60, SA60, FA60, CA60, Sv%, FSv%, CSv%.',
			},
			{
				sref : 'teams' ,
				title : 'Team Stats',
				desc : 'Best Club in the League!',
			}
		]	
	});