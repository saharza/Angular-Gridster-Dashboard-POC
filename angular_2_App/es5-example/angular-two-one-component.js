/**
 * Created by saharza on 21/03/2016.
 */
(function (app) {
    app.AngularTwoOneComponent = app.ng2.core
        .Component({
            selector: 'angular-two-one',
            template: '<div class="angular-two-one-directive-container"><angular-one></angular-one><angular-two></angular-two></div>',
            directives: [app.adapter.upgradeNg1Component('angularOne'), app.AngularTwoComponent]
        })
        .Class({
            constructor: function () {}
        });
})(window.app || (window.app = {}));