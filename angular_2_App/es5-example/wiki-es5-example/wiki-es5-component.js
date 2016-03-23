/**
 * Created by saharza on 22/03/2016.
 */
(function (app) {
    app.wikiComponent = app.ng2.core
        .Component({
            selector: 'my-wiki',
            template: '<h1>Wikipedia Demo</h1>\n <p><i>Fetches after each keystroke</i></p>\n\n <input #term (keyup)=\"search(term.value)\"/>\n \n <ul>\n <li *ngFor=\"#item of items | async\">{{item}}</li>\n </ul>\n',
            providers: [app.ng2.http.JSONP_PROVIDERS, app.WikiService]
        })
        .Class({
            constructor: [app.WikiService, function (WikiService) {
                this._wikipediaService = WikiService;
                this.items = [];
            }],

            search: function (term) {
                this.items = this._wikipediaService.search(term);
            }
        });
})(window.app || (window.app = {}));
