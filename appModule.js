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
        }]).run(['$templateCache', function($templateCache){
            $templateCache.put('iFrame_Widget1', '<iframe-widget widget-src="{{\'http://www.nexidia.com/\'}}"></iframe-widget>');
            $templateCache.put('iFrame_Widget2', '<iframe-widget widget-src="{{widget.widgetUrl}}"></iframe-widget>');
            $templateCache.put('Chart_Line_Widget', '<chart-line-widget></chart-line-widget>');
            $templateCache.put('Custom_Widget', '<custom-widget></custom-widget>');
            $templateCache.put('Generic_Widget', '<div style="top:60px;left:20px;position:absolute;">Open widget setting to select widget type...</div>');
            $templateCache.put('Angular_2_Widget', '<angular-two></angular-two>');
            $templateCache.put('Angular_2_1_Widget', '<angular-two-one></angular-two-one>');
            $templateCache.put('child_component_Widget', '<list-of-names></list-of-names>');
            $templateCache.put('parent_component_Widget', '<ng2-parent-component></ng2-parent-component>');
        }]);

    //$(document).ready(function () {
    //    $('[data-toggle=offcanvas]').click(function () {
    //        $('.row-offcanvas').toggleClass('active');
    //    });
    //
    //    // Bootstrapping the application after document is ready.
    //    angular.bootstrap($('body'), ['app']);
    //});
})();