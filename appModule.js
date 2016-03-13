/**
 * Created by saharza on 28/01/2016.
 */
(function() {
    angular.module('app', ['gridster', 'ui.bootstrap', 'ui.grid', 'chart.js'])
// Optional configuration
        .config(['$httpProvider', 'ChartJsProvider', function ($httpProvider, ChartJsProvider) {
            // configure $http service
            $httpProvider.defaults.useXDomain = true;
            //$httpProvider.defaults.withCredentials = true;
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
            $httpProvider.defaults.headers.common["Accept"] = "application/json";
            $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
            $httpProvider.defaults.headers.common['Authorization'] = 'Basic a2VybWl0Omtlcm1pdA==';

            // Configure all charts
            ChartJsProvider.setOptions({
                colours: ['#FF5252', '#FF8A80'],
                responsive: true
            });
        }]);

    $(document).ready(function () {
        $('[data-toggle=offcanvas]').click(function () {
            $('.row-offcanvas').toggleClass('active');
        });

        // Bootstrapping the application after document is ready.
        angular.bootstrap($('body'), ['app']);

        // TODO: trying to add new style element to the iframe head element.
        //var cssStyle = "<style type='text/css'>  " +
        //    "#com.ibm.bi.glass.appbar{ display: none !important; }" +
        //    "</style>";
        //$('iframe').load( function() {
        //    $('iframe').contents().find("head")
        //        .append($(cssStyle));
        //});
    });
})();