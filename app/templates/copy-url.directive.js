var app = angular
    .module('puckalyticsMainApp.copyUrl', [
        'ui.router', 'ui.bootstrap', 
    ]);

app.directive('copyUrl', copyUrlDirective);

function copyUrlDirective() {
    var validElement = angular.element('<div>{{ model.input }}</div>');
    var link = function(scope) {
        scope.$watch("model.input", function(value) {
            if (value === "password") {
                validElement.toggleClass("alert-box alert");
            }
        });
    };
    return {
        restrict: "E",
        replace: true,
        templateUrl: "dumbpass.html",
        compile: function(tElem) {
            tElem.append(validElement);
            return link;
        }
    }
}