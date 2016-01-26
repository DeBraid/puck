
angular
    .module('puckalyticsMainApp.copyUrl', [
        'ui.router', 'ui.bootstrap', 'angular-clipboard'
    ])
    .directive('copyUrl', copyUrlDirective);

function copyUrlDirective($state, $timeout) {

    var default_btn_text = 'Copy Table URL to Clipboard';
    var default_url = $state.href($state.current.name, $state.params, {absolute: true})

    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'app/templates/copy-url.html',
        link: linkFn
    }

    function linkFn (scope) {
        scope.successful = false;
        scope.failed = false;

        scope.btn_text = default_btn_text;
        scope.textToCopy = default_url;
        
        scope.$on('filter_menu_update', buildUrlToCopy);
        scope.$on('filter_inputs_changed', buildUrlToCopy);

        function buildUrlToCopy (event, args) {
            var new_url = $state.href($state.current.name, args, {absolute: true});
            // FIXME DB - temporary hack the URL whilst in development
            var split_url = new_url.split('#');
            var hacked_URL = split_url[0] + 'puck-master/#' + split_url[1]; 
            console.log('hacked_URL, split_url', hacked_URL, split_url);
            scope.textToCopy = hacked_URL;
        }

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