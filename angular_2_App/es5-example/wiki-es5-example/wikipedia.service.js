/**
 * Created by saharza on 22/03/2016.
 */
(function (app) {
    app.WikiService = app.ng2.core.Injectable().Class({
        constructor: [ jsonp, function (jsonp) {
            this.jsonp = jsonp;
        }],

        search: function (term) {
            var wikiUrl = 'http://en.wikipedia.org/w/api.php';
            var params = new app.ng2.http.URLSearchParams();
            params.set('search', term); // the user's search value
            params.set('action', 'opensearch');
            params.set('format', 'json');
            params.set('callback', 'JSONP_CALLBACK');
            // TODO: Add error handling
            return this.jsonp
                .get(wikiUrl, { search: params })
                .map(function (request) { return request.json()[1]; });
        }
    });
})(window.app || (window.app = {}));
