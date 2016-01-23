var app = angular
    .module('puckalyticsMainApp.copyUrl', [
        'ui.router', 'ui.bootstrap', 'angular-clipboard'
    ]);

app.directive('copyUrl', copyUrlDirective);

function copyUrlDirective($state, $timeout) {
    // var input = angular.element('<div>{{ model.input }}</div>');
    var default_btn_text = 'Copy URL to Share with Current Filters';
    // var link = linkFn; 
    var default_url = $state.href($state.current.name, $state.params, {absolute: true})

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/templates/copy-url.html',
        link: linkFn
    }
    
    function linkFn (scope) {
        scope.btn_text = 'Copy Table URL to Clipboard';
        scope.successful = false;
        scope.failed = false;
        scope.textToCopy = default_url;

        scope.$on('filter_inputs_changed', function (event, args) {
            var my_href = $state.href($state.current.name, args , {absolute: true});
            scope.textToCopy = my_href;
        });

        scope.success = function () {
            scope.successful = true;
            scope.btn_text = 'URL Copied to Clipboard!';
            resetBtn();
        };
        scope.fail = function (err) {
            scope.failed = true;
            scope.btn_text = 'Failed to copy URL!';
            resetBtn();
        };

        function resetBtn () {
            $timeout(function () {
                scope.btn_text = default_btn_text;
                scope.successful = false;
                scope.failed = false;
            }, 3000);
        }
    };
}