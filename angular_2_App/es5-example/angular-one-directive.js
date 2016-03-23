/**
 * Created by saharza on 21/03/2016.
 */
(function(app){
    angular.module('app').directive("angularOne", function () {
        return {
            scope: {},
            template: '<h3>{{someText}}</h2>',
            controller: function ($scope) {
                $scope.someText = "This is an Angular 1 directive.";
            }
        };
    });
})(window.app || (window.app = {}));