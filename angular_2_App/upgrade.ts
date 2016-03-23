System.register(['angular2/upgrade', './wiki/wiki.component', './wiki/wiki-smart.component'], function(exports_1) {
    var upgrade_1, wiki_component, wiki_smart_component;
    var adapter;
    return {
        setters:[
            function (upgrade_1_1) {
                upgrade_1 = upgrade_1_1;
            },
            function (wiki_component_1_1) {
                wiki_component = wiki_component_1_1;
            },
            function (wiki_smart_component_1_1) {
                wiki_smart_component = wiki_smart_component_1_1;
            }],
        execute: function() {
            adapter = new upgrade_1.UpgradeAdapter();
            angular.module('app').directive('wiki', adapter.downgradeNg2Component(wiki_smart_component.WikiComponent));
            angular.module('app').directive('wikiSmart', adapter.downgradeNg2Component(wiki_smart_component.WikiSmartComponent));
            adapter.bootstrap(document.body, ['app']);
        }
    }
});