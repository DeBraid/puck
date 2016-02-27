angular
    .module('puckalyticsMainApp')
    .config(MainAppRouterConfig);

function MainAppRouterConfig (
    $stateProvider, $urlRouterProvider, MainAppConstants
) {
    var goalie_params = MainAppConstants.goalie_params;
    var team_params = MainAppConstants.teams_params;
    var skater_params = MainAppConstants.skater_params;
    
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/homepage/homepage.html',
            controller: 'HomepageController',
            controllerAs: 'home'
        })
        .state('skaters', {
            url: '/skaters?season=201516&situation=5v5&TOIMin=200', // + createUrl(skater_params),
            //params: skater_params,
            templateUrl: 'app/skaters/skaters.html',
            controller: 'SkatersController'
        })
        .state('goalies', {
            url: '/goalies?' + createUrl(goalie_params),
            params: goalie_params,
            templateUrl: 'app/goalies/goalies.html',
            controller: 'GoalieController'
        })
        .state('teams', {
            url: '/teams?' + createUrl(team_params),
            params: team_params,
            templateUrl: 'app/teams/teams.html',
            controller: 'TeamsController'
        })
        .state('glossary', {
            url: '/glossary',
            templateUrl: 'app/templates/glossary.html'
        })
        .state('faq', {
            url: '/faq',
            templateUrl: 'app/templates/faq.html'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'app/templates/contact.html'
        });

    // Working example URL : http://localhost:3737/#/goalies?FAMin=690&CAMax=920
    function createUrl (filter_defaults) {
        var params = [];
        for (key in filter_defaults) {
            var param = '={' + key + '}&';
            params.push(param);        
        }
        var params_url = params.join(',').split(',').join('');
        return params_url;
    }

}