
angular
	.module('puckalyticsMainApp.filterMenu', [
		'ui.router', 
		'ui.bootstrap',
        'puckalyticsMainApp.getData'
	])
	.directive('filterMenu', filter_menu_directive );

function filter_menu_directive (getData) {
    return {
        restrict: 'E',
        templateUrl: 'templates/app.filter_menu.html',
        scope: {
            toi: '=toi' , 
            season: '=season',
            situation: '=situation',
        },
        controller: FilterMenuController,
        controllerAs: 'filter_menu'
        // link: filter_menu_link_fn,
    }
}

function FilterMenuController (
    $rootScope, $scope, $location, 
    getData, filterMenuConstants
) {
	var self = this;
    // console.log('filter menu scope: ', $scope);
    self.seasons = filterMenuConstants.season_options;
    self.situations = filterMenuConstants.situation_options;
    self.passData = broadcast_filter_menu_data;

    function broadcast_filter_menu_data (){
        var data_to_broadcast = {
            route: $location, 
            season: $scope.season, 
            situation: $scope.situation, 
            TOIMin: $scope.toi
        }
        
        $rootScope.$broadcast('filter_menu_update', data_to_broadcast);
    }
}

// function filter_menu_link_fn (scope, element, attrs) {
//     console.log('stuff in filter_menu_link_fn', scope, element, attrs);
// }