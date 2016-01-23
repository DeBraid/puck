var app = angular
    .module('puckalyticsMainApp.copyUrl', [
        'ui.router', 'ui.bootstrap', 'angular-clipboard'
    ]);

app.directive('copyUrl', copyUrlDirective);

function copyUrlDirective($state) {
    var input = angular.element('<div>{{ model.input }}</div>');
    
    // console.log('url_to_copy in copyUrl', url_to_copy);
    // var route = '/goalies?';
    // var params = 'TOIMin=222&GAMax=55';

    var link = function(scope) {
        
        scope.$on('filter_inputs_changed', function (event, args) {
            console.log('received filter_inputs_changed args', args);
            scope.textToCopy = createUrl(args);
        });

        var my_href = $state.href($state.current.name, {absolute: true});
        // active_filters

        console.log('my href in copy URL', my_href);
        console.log('active_filters in copy url', scope.active_filters);

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

    function createUrl (filter_defaults) {
        var params = [];
        // console.log('filter_defaults', filter_defaults);
        for (key in filter_defaults) {
            // console.log('key in filter_defaults', key, filter_defaults[key]);
            var val = filter_defaults[key];
            var param = key + '=' + val + '&';

            params.push(param);        
        }
        var params_url = params.join(',').split(',').join('');
        // console.log('params_url', params_url);
        return params_url;
    }
}