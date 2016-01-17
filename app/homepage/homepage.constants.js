
angular
	.module('puckalyticsMainApp.homepage')
	.constant('homepageConstants', {
		sections: [{
			sref : 'skatergoalstats' ,
			title : 'Goal Stats',
			desc : 'GF, GA, GF60, GA60, GF%, TMGF60, TMGA60, TMGF%, OppGF60, OppGA60, OppGF%, GF60 RelTM, GA60 RelTM, GF% RelTM, Sh%, Sv%, PDO, Sh% RelTM, Sv% RelTM',
			metrics: ['GF','GA','GF60','GA60','GF%','TMGF60','TMGA60','TMGF%','OppGF60','OppGA60','OppGF%','GF60RelTM','GA60RelTM','GF%RelTM','Sh%','Sv%','PDO','Sh%RelTM','Sv%RelTM']
		},{
			sref : 'skatershotstats' ,
			title : 'Shot Stats',
			desc : 'Shooting stats with zone starts.',
		},{
			sref : 'skaterfenwickstats' ,
			title : 'Fenwick Stats',
			desc : 'FF, FA, FF60, FA60, FF%, TMFF60, TMFA60, TMFF%, OppFF60, OppFA60, OppFF%, FF60 RelTM, FA60 RelTM, FF% RelTM, FSh%, FSv%, FPDO, TotFO',
		},{
			sref : 'skatercorsistats' ,
			title : 'Corsi Stats',
			desc : 'CF, CA, CF60, CA60, CF%, TMCF60, TMCA60, TMCF%, OppCF60, OppCA60, OppCF%, CF60 RelTM, CA60 RelTM, CF% RelTM, CSh%, CSv%, CPDO, TotFO',
		},{
			sref : 'skaterindividualstats' ,
			title : 'Individual Stats',
			desc : ' A scaled down version of the Super Stats Table featuring individual skater stats.',
		},{
			sref : 'skaterpctofteamstats' ,
			title : '% of Team Stats',
			desc : '% of Team Stats faster and improved.',
		},{
			sref : 'skatersuperstats' ,
			title : 'Super Stats Table',
			desc : 'Every single individual skater (forwards and defensemen) stats from Puckalytics.com: Goals, Shots, Fenwick, Corsi, and derivatives',
		},{
			sref : 'goalies' ,
			title : 'Goalie Stats',
			desc : 'Keepers: GA, SA, FA, CA, GA60, SA60, FA60, CA60, Sv%, FSv%, CSv%.',
		},{
			sref : 'teamstats' ,
			title : 'Team Stats',
			desc : 'Best Club in the League!',
		},{
			sref : 'superwowy' ,
			title : 'Super WOWY',
			desc : 'Includes data for all regular season games going back to 2007-08.',
		}
	]
});