
angular
	.module('puckalyticsMainApp.playoffs', [
		'ui.router', 
		'ui.bootstrap'
	])
	.controller('PlayoffsController', PlayoffsController );

function PlayoffsController (
	$scope, $stateParams, getData
) {

	var links = [
		{
			title: 'Skaters ipoints60', 
			href: 'http://localhost:3737/#/skaters?TOIMin=750&Team=&Player_Name=&Pos=&orderby=ipoints60&sortorder=true'
		},
		{
			title: 'GF 60 Relative to Teammates', 
			href: 'http://localhost:3737/#/skaters?orderby=GF60RelTM&sortorder=true&TOIMin=750&Team=&Player_Name=&Pos=&dcustom=false&dgoals=false&dcorsi=false&dpcts=false&dtm=false&dopp=false&dreltm=true&dind=false&dpctteam=false&dzs=false'
		},
		{
			title: '% of Team GF', 
			href: 'http://localhost:3737/#/skaters?orderby=TeamGFPct&sortorder=true&TOIMin=750&Team=&Player_Name=&Pos=&dcustom=false&dgoals=false&dcorsi=false&dpcts=false&dtm=false&dopp=false&dreltm=false&dind=false&dpctteam=true&dzs=false'
		},
		{
			title: 'Injuries', 
			href: 'http://www.sportsnet.ca/hockey/nhl/nhl-injuries-report-teams-playoff-roundup-malkin-stamkos-stralman-hedman-mcdonagh-crawford/'
		},		
		
	]
	var non_playoff_teams = [
		'Ottawa', 'Colorado', 'New Jersey', 
		'Montreal', 'Buffalo', 'Arizona', 
		'Winnipeg', 'Calgary', 'Columbus', 
		'Vancouver', 'Edmonton', 'Toronto',
	]
	
	var defaults = {
		loading : false,
		links : links,
		playoff_teams : [],
		non_playoff_teams : non_playoff_teams,
		url: 'http://puckalytics.com/php/getplayerdata2.php?season=201516&sit=5v5&minutes=1200&info=1&goal=1'
	};

	angular.extend( $scope , defaults );

	init();

	function init() {
		$scope.loading = true;
		
		getData
			.withFullUrl($scope.url)
			.then(checkForErrors)
			.then(extractPlayoffTeams)
			.then(shapeDataForCharting)
			.then(function () { $scope.loading = false; });

	}

	function shapeDataForCharting(data) {
		console.log('shapeDataForCharting data', data);
		var teams = {
			team : '',
			players : []
		};
		angular.forEach($scope.playoff_teams, function (team) {
			var this_team = {
				team_name : team,
				players: []
			}
			angular.forEach(data, function (player) {
				if (team == player.Team) {
					this_team.players.push(player.Player_Name);
				}
			});
			console.log('this_team', this_team);
		});
	}

	function extractPlayoffTeams ( response ) {
		var skaters = response;
		var playoff_teams = [];
		angular.forEach(skaters, function (skater) {
			var team = skater.Team;
			if ( non_playoff_teams.indexOf( team ) < 0 ) {
				playoff_teams.push(team);
			}
		});
		$scope.playoff_teams = _.uniq(playoff_teams);
		return response;
	}

	function checkForErrors ( data ) {
		if (angular.isArray(data)) {
			$scope.error_message = null;
		} else { 
			$scope.error_message = 'Something wrong, please try again.';
		}
		return data;
	}
};