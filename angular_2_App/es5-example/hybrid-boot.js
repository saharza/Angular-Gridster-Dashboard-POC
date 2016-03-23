/**
 * Created by saharza on 21/03/2016.
 */
(function(app){
    angular.module('app').directive('angularTwo', app.adapter.downgradeNg2Component(app.AngularTwoComponent));
    angular.module('app').directive('angularTwoOne', app.adapter.downgradeNg2Component(app.AngularTwoOneComponent));
    angular.module('app').directive('listOfNames', app.adapter.downgradeNg2Component(app.ChildComponent));
    angular.module('app').directive('ng2ParentComponent', app.adapter.downgradeNg2Component(app.ParentComponent));

    document.addEventListener('DOMContentLoaded', function () {
        app.adapter.bootstrap(document.body, ['app']);
    });
})(window.app || (window.app = {}));