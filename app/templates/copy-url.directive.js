var app = angular
    .module('puckalyticsMainApp.copyUrl', [
        'ui.router', 'ui.bootstrap', 'angular-clipboard'
    ]);

app.directive('copyUrl', copyUrlDirective);

function copyUrlDirective($state) {
    var url_to_copy = $state.href($state.current.name, $state.params, {absolute: true});
    var input = angular.element('<div>{{ model.input }}</div>');
    
    console.log('url_to_copy in copyUrl', url_to_copy);
    // var route = '/goalies?';
    // var params = 'TOIMin=222&GAMax=55';

    var link = function(scope) {
        
        scope.textToCopy = url_to_copy;

        console.log('scope in copy url', scope);
        scope.success = function () {
            console.log('Copied!');
        };
        scope.fail = function (err) {
            console.error('Error!', err);
        };
    };
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/templates/copy-url.html',
        compile: function(tElem) {
            tElem.append(input);
            return link;
        }
    }
}