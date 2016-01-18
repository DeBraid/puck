
angular
	.module('puckalyticsMainApp')
	.constant('MainAppConstants', {		
		teams_params: {
			teamname: '',
			season: '201516',
			situation: '5v5',
			TOIMin : '100',
			TOIMax : '99999',
			GPMin : '0',
			GPMax : '999',
			GAMin : '0',
			GAMax : '999',
			GFMin : '0',
			GFMax : '999',
			SAMin : '0',
			SAMax : '9999',
			SFMin : '0',
			SFMax : '9999',
			FAMin : '0',
			FAMax : '9999',
			CAMin : '0',
			CAMax : '9999',
			FFMin : '0',
			FFMax : '9999',
			CFMin : '0',
			CFMax : '9999',
			GA60Min : '0',
			GA60Max : '100',
			SF60Min : '0',
			SF60Max : '100',
			SA60Min : '0',
			SA60Max : '100',
			FA60Min : '0',
			FA60Max : '100',
			CA60Min : '0',
			CA60Max : '100',
			GF60Min : '0',
			GF60Max : '100',
			SF60Min : '0',
			SF60Max : '100',
			FF60Min : '0',
			FF60Max : '100',
			CF60Min : '0',
			CF60Max : '100',
			SVPctMin : '0',
			SVPctMax : '100',
			SFPctMin : '0',
			SFPctMax : '100',
			FSVPctMin : '0',
			FSVPctMax : '100',
			CSVPctMin : '0',
			CSVPctMax : '100',
			CFPctMin : '0',
			CFPctMax : '100',
			PDOMin : '0',
			PDOMax : '200',
			GFPctMin : '0',
			GFPctMax : '100',
			FFPctMin : '0',
			FFPctMax : '100',
			SHPctMin : '0',
			SHPctMax : '100',
			FSHPctMin : '0',
			FSHPctMax : '100',
			FPDOMin : '0',
			FPDOMax : '200',
			CSHPctMin : '0',
			CSHPctMax : '100',
			CPDOMin : '0',
			CPDOMax : '200',
			NZPctMin : '0',
			NZPctMax : '100',
			DZPctMin : '0',
			DZPctMax : '100',
			OZPctMin : '0',
			OZPctMax : '100',
		},
		goalie_params: {
			team : '',
			player_name  : '',
			position : '',
			season : '201516',
			situation : '5v5',
			GPMin : '0',
			GPMax : '999',
			GAMin : '0',
			GAMax : '999',
			SAMin : '0',
			SAMax : '9999',
			FAMin : '0',
			FAMax : '9999',
			CAMin : '0',
			CAMax : '9999',
			GA60Min : '0',
			GA60Max : '100',
			SA60Min : '0',
			SA60Max : '100',
			FA60Min : '0',
			FA60Max : '100',
			CA60Min : '0',
			CA60Max : '100',
			SvPctMin : '0',
			SvPctMax : '100',
			FSvPctMin : '0',
			FSvPctMax : '100',
			CSvPctMin : '0',
			CSvPctMax : '100',
			TOIMin : '100',
			TOIMax : '99999',
		},
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
			metrics: ['GA','SA','FA','CA','GA60','SA60','FA60','CA60','Sv%','FSv%','CSv%']
		},{
			sref : 'teamstats' ,
			title : 'Team Stats',
			desc : 'Best Club in the League!',
		},{
			sref : 'superwowy' ,
			title : 'Super WOWY',
			desc : 'Includes data for all regular season games going back to 2007-08.',
		},
		{
			sref : 'glossary',
			template : 'app/template/glossary.html',
			title : 'Glossary',
			desc : 'Definition of terms and stat abbreviations.'
		}
	]
});