
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
        templateUrl: 'app/filter-menu/filter-menu.html',
        scope: {
            toi: '=toi' , 
            season: '=season',
            situation: '=situation',
        },
        controller: FilterMenuController,
        controllerAs: 'filter_menu'
    }
}

function FilterMenuController (
    $rootScope, $scope, $location, 
    getData, filterMenuConstants
) {
	var self = this;
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