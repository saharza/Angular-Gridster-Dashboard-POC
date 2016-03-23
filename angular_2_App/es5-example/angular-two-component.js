/**
 * Created by saharza on 21/03/2016.
 */
(function (app) {
    app.AngularTwoComponent = app.ng2.core
        .Component({
            selector: 'angular-two',
            template: '<h2>{{someText}}</h2>'
        })
        .Class({
            constructor: function () {
                this.someText = "This is an Angular 2 component."
            }
        });
})(window.app || (window.app = {}));