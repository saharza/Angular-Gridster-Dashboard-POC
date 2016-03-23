/**
 * Created by saharza on 28/01/2016.
 */
(function() {
    angular.module('app')
        .constant('widgetTemplatesProvider', {
            'iFrame_Widget1': '<iframe-widget widget-src="{{\'http://www.nexidia.com/\'}}"></iframe-widget>',
            'iFrame_Widget2': '<iframe-widget widget-src="{{widget.widgetUrl}}"></iframe-widget>',
            'Chart_Line_Widget': '<chart-line-widget></chart-line-widget>',
            'Custom_Widget': '<custom-widget></custom-widget>',
            'Wiki_Widget': '<angular-two></angular-two>', //'<my-wiki>Wiki Loading...</my-wiki>',
            'Smart_Wiki_Widget': '<my-wiki-smart>WikiSmart Loading...</my-wiki-smart>',
            'Generic_Widget': '<div style="top:60px;left:20px;position:absolute;">Open widget setting to select widget type...</div>'
        }).service('predefinedLayoutTemplateService', ['$q',
            function($q){
                var predefinedTemplates = {
                    '3_2_1_3' : {
                        items:[
                            {
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 1,
                                row: 0,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 1,
                                row: 0,
                                col: '[columns] / 3',
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 1,
                                row: 0,
                                col: '([columns] / 3) * 2',
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '([columns] / 3) * 2',
                                sizeY: 1,
                                row: 1,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 1,
                                row: 1,
                                col: '([columns] / 3) * 2',
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 1,
                                row: 2,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 1,
                                row: 2,
                                col: '[columns] / 3',
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 1,
                                row: 2,
                                col: '([columns] / 3) * 2',
                                isMaximized: false
                            }]
                    },
                    '1_2_1' : {
                        items:[
                            {
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns]',
                                sizeY: 1,
                                row: 0,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 2',
                                sizeY: 1,
                                row: 1,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 2',
                                sizeY: 1,
                                row: 1,
                                col: '[columns] / 2',
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns]',
                                sizeY: 1,
                                row: 2,
                                col: 0,
                                isMaximized: false
                            }]
                    },
                    '2_1_2' : {
                        items:[
                            {
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 2',
                                sizeY: 1,
                                row: 0,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 2',
                                sizeY: 1,
                                row: 0,
                                col: '[columns] / 2',
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns]',
                                sizeY: 1,
                                row: 1,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 2',
                                sizeY: 1,
                                row: 2,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 2',
                                sizeY: 1,
                                row: 2,
                                col: '[columns] / 2',
                                isMaximized: false
                            }]
                    },
                    '2_3' : {
                        items:[
                            {
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 2',
                                sizeY: 1,
                                row: 0,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 2',
                                sizeY: 1,
                                row: 0,
                                col: '[columns] / 2',
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '([columns] / 2) + 1 ',
                                sizeY: 3,
                                row: 1,
                                col: 0,
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 2,
                                row: 1,
                                col: '([columns] / 2) + 1 ',
                                isMaximized: false
                            },{
                                widgetType: 'Generic_Widget',
                                name: 'Generic Widget',
                                sizeX: '[columns] / 3',
                                sizeY: 1,
                                row: 3,
                                col: '([columns] / 2) + 1 ',
                                isMaximized: false
                            }]
                    }
                };

                function getTmplConfig(tmplKey, columns){
                    var deferred = $q.defer(),
                        tmplConfig, result;
                    if(!predefinedTemplates.hasOwnProperty(tmplKey)){
                        deferred.reject('No template exist...');
                    }else {
                        tmplConfig = angular.merge({}, predefinedTemplates[tmplKey]);
                        for (var i = 0, len = tmplConfig.items.length; i < len; i++) {
                            for (prop in tmplConfig.items[i]) {
                                if (typeof tmplConfig.items[i][prop] === "string" && tmplConfig.items[i][prop].indexOf('[columns]') !== -1) {
                                    tmplConfig.items[i][prop].replace('[columns]', columns);
                                    result = eval(tmplConfig.items[i][prop]);
                                    result = result instanceof Array ? result[0] : result;
                                    tmplConfig.items[i][prop] = result;
                                }
                            }
                        }

                        deferred.resolve(tmplConfig);
                    }

                    return deferred.promise;
                }

                this.getPredefinedTemplateConfig = function(templateKey, numOfColumns){
                    return getTmplConfig(templateKey, numOfColumns);
                }
        }]).service('portletEventService', ['$rootScope',
            function($rootScope){
                this.publishEvent = function(keyEvent, data){
                    $rootScope.$emit(keyEvent, data);
                };

                this.subscribeToEvent = function(keyEvent, callback){
                    $rootScope.$on(keyEvent, callback);
                };
            }]);
})();