/**
 * Created by saharza on 21/03/2016.
 */
(function(app){
    angular.module('app').directive("angularOneTwo", function () {
        return {
            scope: {},
            template: '<div class="angular-one-two-directive-container"><angular-one></angular-one><angular-two></angular-two></div>',
            controller: function ($scope) {}
        };
    });
})(window.app || (window.app = {}));