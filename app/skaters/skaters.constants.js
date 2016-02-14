angular
	.module('puckalyticsMainApp.skaters')
	.constant('skatersConstants', {
		skater_metrics_object : [
			{API_Name : 'GP',			API_Section: 'goals',	DisplayWhen: 'displayInfo',				DisplayName: 'GP',			decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'TOIDec',			API_Section: 'goals',	DisplayWhen: 'displayInfo',				DisplayName: 'TOI',			decimal: '2',	Min:'0', Max:'9999'},
			{API_Name : 'GF',			API_Section: 'goals',	DisplayWhen: 'displayGoals',				DisplayName: 'GF',			decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'GA',			API_Section: 'goals',	DisplayWhen: 'displayGoals',				DisplayName: 'GA',			decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'GF60',			API_Section: 'goals',	DisplayWhen: 'displayGoals',				DisplayName: 'GF60',		decimal: '2',	Min:'0', Max:'99'},
			{API_Name : 'GA60',			API_Section: 'goals',	DisplayWhen: 'displayGoals',				DisplayName: 'GA60',		decimal: '2',	Min:'0', Max:'99'},
			{API_Name : 'GFPct',		API_Section: 'goals',	DisplayWhen: 'displayGoals',				DisplayName: 'GF%',			decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TMGF60',		API_Section: 'goals',	DisplayWhen: 'displayTM',	DisplayName: 'TM GF60',		decimal: '2',	Min:'0', Max:'99'},
			{API_Name : 'TMGA60',		API_Section: 'goals',	DisplayWhen: 'displayTM',	DisplayName: 'TM GA60',		decimal: '2',	Min:'0', Max:'99'},
			{API_Name : 'TMGFPct',		API_Section: 'goals',	DisplayWhen: 'displayTM',	DisplayName: 'TM GF%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'GF60RelTM',	API_Section: 'goals',	DisplayWhen: 'displayRelTM',		DisplayName: 'GF60 RelTM',	decimal: '2',	Min:'-99', Max:'99'},
			{API_Name : 'GA60RelTM',	API_Section: 'goals',	DisplayWhen: 'displayRelTM',		DisplayName: 'GA60 RelTM',	decimal: '2',	Min:'-99', Max:'99'},
			{API_Name : 'GFPctRelTM',	API_Section: 'goals',	DisplayWhen: 'displayRelTM',		DisplayName: 'GF% RelTM',	decimal: '2',	Min:'-100', Max:'100'},
			{API_Name : 'OppGF60',		API_Section: 'goals',	DisplayWhen: 'displayOpp',	DisplayName: 'Opp GF60',	decimal: '2',	Min:'0', Max:'99'},
			{API_Name : 'OppGA60',		API_Section: 'goals',	DisplayWhen: 'displayOpp',	DisplayName: 'Opp GA60',	decimal: '2',	Min:'0', Max:'99'},
			{API_Name : 'OppGFPct',		API_Section: 'goals',	DisplayWhen: 'displayOpp',	DisplayName: 'Opp GF%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'ShPct',		API_Section: 'goals',	DisplayWhen: 'displayGoals',				DisplayName: 'Sh%',			decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'SvPct',		API_Section: 'goals',	DisplayWhen: 'displayGoals',				DisplayName: 'Sv%',			decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'PDO',			API_Section: 'goals',	DisplayWhen: 'displayGoals',				DisplayName: 'PDO',			decimal: '2',	Min:'0', Max:'200'},
			{API_Name : 'TMShPct',		API_Section: 'goals',	DisplayWhen: 'displayTM',	DisplayName: 'TM Sh%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TMSvPct',		API_Section: 'goals',	DisplayWhen: 'displayTM',	DisplayName: 'TM Sv%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'ShPctRelTM',	API_Section: 'goals',	DisplayWhen: 'displayRelTM',		DisplayName: 'Sh% RelTM',	decimal: '2',	Min:'-100', Max:'100'},
			{API_Name : 'SvPctRelTM',	API_Section: 'goals',	DisplayWhen: 'displayRelTM',		DisplayName: 'Sv% RelTM',	decimal: '2',	Min:'-100', Max:'100'},
			{API_Name : 'OppShPct',		API_Section: 'goals',	DisplayWhen: 'displayOpp',				DisplayName: 'Opp Sh%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'OppSvPct',		API_Section: 'goals',	DisplayWhen: 'displayOpp',				DisplayName: 'Opp Sv%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'CF',			API_Section: 'corsi',	DisplayWhen: 'displayCorsi',				DisplayName: 'CF',			decimal: '0',	Min:'0', Max:'99999'},
			{API_Name : 'CA',			API_Section: 'corsi',	DisplayWhen: 'displayCorsi',				DisplayName: 'CA',			decimal: '0',	Min:'0', Max:'99999'},
			{API_Name : 'CF60',			API_Section: 'corsi',	DisplayWhen: 'displayCorsi',				DisplayName: 'CF60',		decimal: '2',	Min:'0', Max:'999'},
			{API_Name : 'CA60',			API_Section: 'corsi',	DisplayWhen: 'displayCorsi',				DisplayName: 'CA60',		decimal: '2',	Min:'0', Max:'999'},
			{API_Name : 'CFPct',		API_Section: 'corsi',	DisplayWhen: 'displayCorsi',				DisplayName: 'CF%',			decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TMCF60',		API_Section: 'corsi',	DisplayWhen: 'displayCorsi && tmstats',	DisplayName: 'TM CF60',		decimal: '2',	Min:'0', Max:'999'},
			{API_Name : 'TMCA60',		API_Section: 'corsi',	DisplayWhen: 'displayCorsi && tmstats',	DisplayName: 'TM CA60',		decimal: '2',	Min:'0', Max:'999'},
			{API_Name : 'TMCFPct',		API_Section: 'corsi',	DisplayWhen: 'displayCorsi && tmstats',	DisplayName: 'TM CF%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'CF60RelTM',	API_Section: 'corsi',	DisplayWhen: 'displayRelTM',		DisplayName: 'CF60 RelTM',	decimal: '2',	Min:'-999', Max:'999'},
			{API_Name : 'CA60RelTM',	API_Section: 'corsi',	DisplayWhen: 'displayRelTM',		DisplayName: 'CA60 RelTM',	decimal: '2',	Min:'-999', Max:'999'},
			{API_Name : 'CFPctRelTM',	API_Section: 'corsi',	DisplayWhen: 'displayRelTM',		DisplayName: 'CF% RelTM',	decimal: '2',	Min:'-100', Max:'100'},
			{API_Name : 'OppCF60',		API_Section: 'corsi',	DisplayWhen: 'displayOpp',	DisplayName: 'Opp CF60',	decimal: '2',	Min:'0', Max:'999'},
			{API_Name : 'OppCA60',		API_Section: 'corsi',	DisplayWhen: 'displayOpp',	DisplayName: 'Opp CA60',	decimal: '2',	Min:'0', Max:'999'},
			{API_Name : 'OppCFPct',		API_Section: 'corsi',	DisplayWhen: 'displayOpp',	DisplayName: 'Opp CF%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'CShPct',		API_Section: 'corsi',	DisplayWhen: 'displayCorsi',				DisplayName: 'CSh%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'CSvPct',		API_Section: 'corsi',	DisplayWhen: 'displayCorsi',				DisplayName: 'CSv%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'CPDO',			API_Section: 'corsi',	DisplayWhen: 'displayCorsi',				DisplayName: 'CPDO',		decimal: '2',	Min:'0', Max:'200'},
			{API_Name : 'TMCShPct',		API_Section: 'corsi',	DisplayWhen: 'displayTM',	DisplayName: 'TM CSh%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TMCSvPct',		API_Section: 'corsi',	DisplayWhen: 'displayTM',	DisplayName: 'TM CSv%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'CShPctRelTM',	API_Section: 'corsi',	DisplayWhen: 'displayRelTM',		DisplayName: 'CSh% RelTM',	decimal: '2',	Min:'-100', Max:'100'},
			{API_Name : 'CSvPctRelTM',	API_Section: 'corsi',	DisplayWhen: 'displayRelTM',		DisplayName: 'CSv% RelTM',	decimal: '2',	Min:'-100', Max:'100'},
			{API_Name : 'OppCShPct',	API_Section: 'corsi',	DisplayWhen: 'displayOpp',	DisplayName: 'Opp CSh%',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'OppCSvPct',	API_Section: 'corsi',	DisplayWhen: 'displayOpp',	DisplayName: 'Opp CSv%',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TeamTOIPct',	API_Section: 'pctteam',	DisplayWhen: 'displayTeamPct',				DisplayName: '%ofTeam TOI',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TeamGFPct',	API_Section: 'pctteam',	DisplayWhen: 'displayTeamPct',				DisplayName: '%ofTeam GF',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TeamGAPct',	API_Section: 'pctteam',	DisplayWhen: 'displayTeamPct',				DisplayName: '%ofTeam GA',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TeamCFPct',	API_Section: 'pctteam',	DisplayWhen: 'displayTeamPct',				DisplayName: '%ofTeam CF',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TeamCAPct',	API_Section: 'pctteam',	DisplayWhen: 'displayTeamPct',				DisplayName: '%ofTeam CA',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TeamOZPct',	API_Section: 'pctteam',	DisplayWhen: 'displayTeamPct',				DisplayName: '%ofTeam OZFO',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TeamDZPct',	API_Section: 'pctteam',	DisplayWhen: 'displayTeamPct',				DisplayName: '%ofTeam DZFO',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'TeamNZPct',	API_Section: 'pctteam',	DisplayWhen: 'displayTeamPct',				DisplayName: '%ofTeam NZFO',	decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'igoals',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'G',			decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'iassists',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'A',			decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'ifassists',	API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'FirstA',		decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'ipoints',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'Pts',			decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'iprimarypoints',	API_Section: 'individual',	DisplayWhen: 'displayIndividual',	DisplayName: 'Pri. Pts',	decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'ishots',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'Shots',		decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'icorsi',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'iCorsi',		decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'ishpct',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'Sh%',			decimal: '2',	Min:'0', Max:'9999'},
			{API_Name : 'icshpct',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'CSh%',		decimal: '2',	Min:'0', Max:'9999'},
			{API_Name : 'igoals60',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'Goals per60',		decimal: '2',	Min:'0', Max:'20'},
			{API_Name : 'iassists60',	API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'Assists per60',		decimal: '2',	Min:'0', Max:'20'},
			{API_Name : 'ifassists60',	API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'FirstA per60',	decimal: '2',	Min:'0', Max:'200'},
			{API_Name : 'ipoints60',	API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'Points per60',		decimal: '2',	Min:'0', Max:'200'},
			{API_Name : 'iprimarypoints60',	API_Section: 'individual',	DisplayWhen: 'displayIndividual',	DisplayName: 'Pri.Pts  per60',	decimal: '2',	Min:'0', Max:'200'},
			{API_Name : 'ishots60',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'Shots per60',		decimal: '2',	Min:'0', Max:'200'},
			{API_Name : 'icorsi60',		API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'iCorsi per60',		decimal: '2',	Min:'0', Max:'200'},
			{API_Name : 'igp',			API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'IGP',			decimal: '2',	Min:'0', Max:'120'},
			{API_Name : 'iap',			API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'IAP',			decimal: '2',	Min:'0', Max:'1200'},
			{API_Name : 'ipp',			API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'IPP',			decimal: '2',	Min:'0', Max:'120'},
			{API_Name : 'IPPP',			API_Section: 'individual',	DisplayWhen: 'displayIndividual',		DisplayName: 'IPPP',		decimal: '2',	Min:'0', Max:'120'},
			{API_Name : 'TotFO',		API_Section: 'faceoffs',	DisplayWhen: 'displayZoneStarts',		DisplayName: 'TotFO',		decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'NZFO',			API_Section: 'faceoffs',	DisplayWhen: 'displayZoneStarts',		DisplayName: 'NZFO',		decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'DZFO',			API_Section: 'faceoffs',	DisplayWhen: 'displayZoneStarts',		DisplayName: 'DZFO',		decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'OZFO',			API_Section: 'faceoffs',	DisplayWhen: 'displayZoneStarts',		DisplayName: 'OZFO',		decimal: '0',	Min:'0', Max:'9999'},
			{API_Name : 'NZFOPct',		API_Section: 'faceoffs',	DisplayWhen: 'displayZoneStarts',		DisplayName: 'NZFO%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'DZFOPct',		API_Section: 'faceoffs',	DisplayWhen: 'displayZoneStarts',		DisplayName: 'DZFO%',		decimal: '2',	Min:'0', Max:'100'},
			{API_Name : 'OZFOPct',		API_Section: 'faceoffs',	DisplayWhen: 'displayZoneStarts',		DisplayName: 'OZFO%',		decimal: '2',	Min:'0', Max:'100'},
		],
		section_options : [
			{
				name : 'info',
				value : 1,
				order_by : ''
			},{
				name : 'goal',
				value : 1,
				order_by : 'GFPct'
			},
//			{
//				name : 'shot',
//				value : 0,
//				order_by : 'SFPct'
//			},{
//				name : 'fenwick',
//				value : 0,
//				order_by : 'FFPct'
//			},
			{
				name : 'corsi',
				value : 1,
				order_by : 'CFPct'
			},{
				name : 'pcts',
				value : 1,
				order_by : ''
			},{
				name : 'pctteam',
				value : 1,
				order_by : 'TeamGFPct'
			},
			{
				name : 'individual',
				value : 1,
				order_by : 'ipoints60'
			},
			{
				name : 'faceoffs',
				value : 1,
				order_by : ''
			}
		]
		
	}); 
	


angular
	.module('puckalyticsMainApp.skaters')
	.constant('skatersConstants2', {
		section_options : [
			{
				name : 'info',
				value : 1,
				order_by : ''
			},{
				name : 'goal',
				value : 1,
				order_by : 'GFPct'
			},
//			{
//				name : 'shot',
//				value : 0,
//				order_by : 'SFPct'
//			},{
//				name : 'fenwick',
//				value : 0,
//				order_by : 'FFPct'
//			},
			{
				name : 'corsi',
				value : 1,
				order_by : 'CFPct'
			},{
				name : 'pcts',
				value : 1,
				order_by : ''
			},{
				name : 'pctteam',
				value : 1,
				order_by : 'TeamGFPct'
			},
			{
				name : 'individual',
				value : 1,
				order_by : 'ipoints60'
			},
			{
				name : 'faceoffs',
				value : 1,
				order_by : ''
			}
		]
	}); 