angular
    .module('puckalyticsMainApp')
    .config(MainAppRouterConfig);

function MainAppRouterConfig (
    $stateProvider, $urlRouterProvider, MainAppConstants
) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/homepage.html',
            controller: 'HomepageController',
            controllerAs: 'home'
        })
        .state('goalies', {
            url: '/goalies?' + createUrl(MainAppConstants.goalie_params),
            params: MainAppConstants.goalie_params,
            templateUrl: 'goaliestats.html',
            controller: 'GoalieController'
        })
        .state('teams', {
            // url: '/teams?' + createUrl(MainAppConstants.goalie_params),
            url: '/teams?',
            params: MainAppConstants.team_params,
            templateUrl: 'new_teams_stats.html',
            controller: 'TeamsController'
        });
        // teamstats

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