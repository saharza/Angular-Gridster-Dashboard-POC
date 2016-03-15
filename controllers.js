(function() {
    angular.module('app').controller('DashboardCtrl', ['$scope', '$timeout',
        function($scope, $timeout) {
            $scope.gridsterOptions = {
                margins: [20, 20],
                columns: 4,
                draggable: {
                    handle: 'h3'
                }
            };

            $scope.dashboards = {
                '1': {
                    id: '1',
                    name: 'Home',
                    widgets: [{
                        col: 0,
                        row: 0,
                        sizeY: 1,
                        sizeX: 1,
                        name: "Widget 1"
                    }, {
                        col: 2,
                        row: 1,
                        sizeY: 1,
                        sizeX: 1,
                        name: "Widget 2"
                    }]
                },
                '2': {
                    id: '2',
                    name: 'Other',
                    widgets: [{
                        col: 1,
                        row: 1,
                        sizeY: 1,
                        sizeX: 2,
                        name: "Other Widget 1"
                    }, {
                        col: 1,
                        row: 3,
                        sizeY: 1,
                        sizeX: 1,
                        name: "Other Widget 2"
                    }]
                }
            };

            $scope.clear = function() {
                $scope.dashboard.widgets = [];
            };

            $scope.addWidget = function() {
                $scope.dashboard.widgets.push({
                    name: "New Widget",
                    sizeX: 1,
                    sizeY: 1
                });
            };

            $scope.$watch('selectedDashboardId', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.dashboard = $scope.dashboards[newVal];
                } else {
                    $scope.dashboard = $scope.dashboards[1];
                }
            });

            // init dashboard
            $scope.selectedDashboardId = '1';

        }
    ])
    .controller('CustomWidgetCtrl', ['$scope', '$timeout', '$modal',
        function($scope, $timeout, $modal) {

            $scope.remove = function(widget) {
                $scope.standardItems.splice($scope.standardItems.indexOf(widget), 1);
            };

            $scope.maximizedWidget = function($event, widget){
                if(!angular.element($event.currentTarget).parents('li').scope().gridster.isMobile) {
                    angular.element($event.currentTarget).parents('li').toggleClass('maximized-widget');
                    widget.isMaximized = !widget.isMaximized;
                }
            };

            $scope.printpr = function printpr($event, widget){
                var printableElm = $(angular.element($event.currentTarget).parents('li')[0]);
                if(!printableElm.hasClass('section-to-print')){
                    printableElm.addClass('section-to-print');
                    window.print();return false;
                }else{
                    printableElm.removeClass('section-to-print');
                }
            };

            $scope.openSettings = function(widget) {
                if(widget.widgetType === 'Generic_Widget'){
                    $scope.openGenericSettings(widget);
                }else if(widget.widgetType === 'iFrame_Widget2') {
                    $scope.openIFrameSettings(widget);
                }else if(widget.widgetType === 'Chart_Line_Widget' || widget.widgetType === 'iFrame_Widget1') {
                    $scope.openGenericSettings(widget);
                }else{
                    $modal.open({
                        scope: $scope,
                        templateUrl: 'widget_settings.html',
                        controller: 'WidgetSettingsCtrl',
                        resolve: {
                            widget: function () {
                                return widget;
                            }
                        }
                    });
                }
            };

            $scope.openGenericSettings = function(widget) {
                $modal.open({
                    scope: $scope,
                    templateUrl: './templates/generic_widget_setting.html',
                    controller: 'WidgetSettingsCtrl',
                    resolve: {
                        widget: function() {
                            return widget;
                        }
                    }
                });
            };

            $scope.openIFrameSettings = function(widget) {
                $modal.open({
                    scope: $scope,
                    templateUrl: './templates/iFrame_widget_setting.html',
                    controller: 'WidgetSettingsCtrl',
                    controllerAs: '$ctrl',
                    resolve: {
                        widget: function() {
                            return widget;
                        }
                    }
                });
            };
        }
    ])
    .controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
        function($scope, $timeout, $rootScope, $modalInstance, widget) {
            var self = this;
            $scope.widget = widget;
            $scope.widgetType = '';
            $scope.widgetTypeLabel = '';

            $scope.form = {
                name: widget.name,
                sizeX: widget.sizeX,
                sizeY: widget.sizeY,
                col: widget.col,
                row: widget.row,
                widgetUrl: ''
            };

            $scope.sizeOptions = [
                {
                id: '1',
                name: '1'
            }, {
                id: '2',
                name: '2'
            }, {
                id: '3',
                name: '3'
            }, {
                id: '4',
                name: '4'
            }];

            $scope.setWidgetType = function setWidgetType(wType){
                $scope.widgetType = wType;
                $scope.widgetTypeLabel = wType.split('_').join(' ');
            };

            $scope.dismiss = function() {
                $modalInstance.dismiss();
            };

            $scope.remove = function() {
                $scope.standardItems.splice($scope.standardItems.indexOf(widget), 1);
                $modalInstance.close();
            };

            $scope.submit = function() {
                if($scope.widgetType !== ''){
                    $scope.form.widgetType = $scope.widgetType;
                    $scope.form.name = $scope.widgetType.split('_').join(' ');
                }

                if($scope.form.widgetUrl === '') {
                    delete $scope.form.widgetUrl;
                }

                if($scope.form.widgetType === 'iFrame_Widget2') {
                    widget.widgetUrl = 'https://www.w3.org/';
                }

                angular.extend(widget, $scope.form);
                $modalInstance.close(widget);
            };
        }
    ])
    .controller('activityEditCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
        function($scope, $timeout, $rootScope, $modalInstance, entity){
            $scope.entity = entity;

            $scope.dismiss = function() {
                $modalInstance.dismiss();
            };

            $scope.submit = function() {
                $modalInstance.close(entity);
            };
    }])
    .controller('MainCtrl', ['$scope', 'predefinedLayoutTemplateService', function($scope, predefinedLayoutTemplateService) {
        $scope.gridsterOpts = {
                minRows: 1, // the minimum height of the grid, in rows
                //maxRows: 10,
                columns: 6, // the width of the grid, in columns
                colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
                rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
                margins: [10, 10], // the pixel distance between each widget
                defaultSizeX: 2, // the default width of a gridster item, if not specifed
                defaultSizeY: 1, // the default height of a gridster item, if not specified
                isMobile: false, // stacks the grid items if true
                mobileBreakPoint: 500, // if the screen is not wider that this, remove the grid layout and stack the items
                mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
                outerMargin: false,
                pushing: false,
                floating: false,
                swapping: false,
                //minSizeX: 2, // minimum column width of an item
                //maxSizeX: 4, // maximum column width of an item
                //minSizeY: 2, // minumum row height of an item
                //maxSizeY: 4, // maximum row height of an item
                draggable: {
                    enabled: false,
                    //handle: '.drag-handler', // optional selector for resize handle
                    stop: function (event, $element, widget) {
                        //TODO: remove after https://github.com/ManifestWebDesign/angular-gridster/issues/283 will be fixed
                        //TODO: fix bug in gridster diractive when large widget overlapping over small widget
                        var gridster = $element.parents('*[gridster]');
                        var GridsterCtrl = gridster.controller('gridster');
                        var gridsterItems = gridster.find('*[gridster-item]');
                        gridsterItems.each(function (indes, node) {
                            var ctrl = angular.element(node).controller('gridsterItem');
                            GridsterCtrl.moveOverlappingItems(ctrl);
                        });
                    },
                    start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                    drag: function(event, $element, widget) {} // , // optional callback fired when item is moved,
                    //stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
                },
                resizable: {
                    enabled: false,
                    handles: ['n', 'e', 's', 'w', 'se', 'sw'],
                    start: function(event, $element, widget) {/* optional callback fired when resize is started, */},
                    resize: function(event, $element, widget) {/* optional callback fired when item is resized, */},
                    stop: function(event, $element, widget) {/* optional callback fired when item is finished resizing */}
                }
        };

        $scope.dashboardOptions = {
            editMode: false
        };

        $scope.$watch(function(){ return $scope.dashboardOptions.editMode; },
            function(newVal, oldVal) {
                if(!newVal){
                    $scope.gridsterOpts.pushing = false;
                    $scope.gridsterOpts.floating = false;
                    $scope.gridsterOpts.draggable.enabled = false;
                    $scope.gridsterOpts.resizable.enabled = false;
                    $scope.gridsterOpts.swapping = false;
                }
        });

        $scope.setNewTemplateLayout = function setNewTemplateLayout(tmplName){
            predefinedLayoutTemplateService.getPredefinedTemplateConfig(tmplName, $scope.gridsterOpts.columns).then(function(tmplConfig){
                $scope.standardItems = tmplConfig.items;
            }, function(error){
                console.log('ERROR: ' + error);
            });
        };


        $scope.addWidget = function(widgetType) {
            $scope.standardItems.push({
                widgetType: widgetType,
                name: widgetType.split('_').join(' '),
                sizeX: 1,
                sizeY: 1,
                row: 0,
                col: 0,
                isMaximized: false
            });
        };

        $scope.saveDashboardLayout = function saveDashboardLayout() {
            sessionStorage.userDashboardLayout = angular.toJson($scope.standardItems);
        };

        $scope.loadDashboardLayout = function loadDashboardLayout(){
            $scope.standardItems = angular.fromJson(sessionStorage.userDashboardLayout);
        };

        $scope.ClearAllDashboardItems = function(){
            $scope.standardItems = [];
        };

        // 120-i //[{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":6,"sizeY":2,"row":34,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget2","widgetUrl":"https://www.w3.org/","name":"iFrame Widget2","sizeX":3,"sizeY":2,"row":0,"col":2,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":3,"sizeY":2,"row":22,"col":3,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":3,"sizeY":2,"row":31,"col":0,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":1,"col":5,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":2,"sizeY":2,"row":13,"col":4,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":0,"col":1,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":3,"col":5,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":28,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":29,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":3,"sizeY":1,"row":4,"col":2,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":36,"col":3,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":36,"col":5,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":12,"col":4,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":36,"col":2,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":1,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":9,"col":5,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":36,"col":4,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":2,"col":5,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":3,"col":2,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":19,"col":1,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":2,"col":3,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":2,"sizeY":3,"row":30,"col":4,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":11,"col":4,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":36,"col":1,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":3,"sizeY":1,"row":29,"col":3,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":36,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":0,"col":5,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":2,"row":30,"col":3,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":32,"col":3,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":2,"col":2,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":3,"col":4,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":5,"sizeY":2,"row":17,"col":0,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":2,"col":4,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":3,"col":3,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":4,"row":16,"col":5,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":8,"col":3,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":3,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":2,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":2,"col":1,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":3,"sizeY":1,"row":20,"col":3,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":4,"sizeY":3,"row":5,"col":2,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":8,"col":5,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":8,"col":4,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":10,"col":5,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":11,"col":5,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":15,"col":4,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":11,"col":3,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":2,"sizeY":2,"row":12,"col":2,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":3,"sizeY":1,"row":21,"col":2,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":21,"col":5,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":20,"col":1,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":21,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":3,"sizeY":1,"row":27,"col":0,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":8,"col":2,"isMaximized":false},{"widgetType":"iFrame_Widget2","name":"iFrame Widget2","sizeX":3,"sizeY":2,"row":9,"col":2,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":12,"col":5,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":3,"sizeY":1,"row":33,"col":3,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":16,"col":4,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":23,"col":2,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":19,"col":4,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":11,"col":2,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":2,"row":19,"col":2,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":30,"col":1,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":3,"sizeY":1,"row":26,"col":3,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":3,"sizeY":2,"row":27,"col":3,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":19,"col":3,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":24,"col":5,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":25,"col":5,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":24,"col":4,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":24,"col":3,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":25,"col":4,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":25,"col":3,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":28,"col":2,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":29,"col":2,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":30,"col":2,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":3,"sizeY":1,"row":33,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":30,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":29,"col":0,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":28,"col":0,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":3,"sizeY":1,"row":26,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":2,"sizeY":2,"row":24,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":25,"col":0,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":23,"col":1,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":24,"col":0,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":23,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":3,"sizeY":1,"row":22,"col":0,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":21,"col":0,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":20,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":19,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":4,"col":5,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":5,"col":1,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":10,"col":1,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":9,"col":1,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":6,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":7,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":8,"col":1,"isMaximized":false},{"widgetType":"iFrame_Widget2","name":"iFrame Widget2","sizeX":1,"sizeY":3,"row":14,"col":3,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":14,"col":1,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":13,"col":1,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":12,"col":1,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":11,"col":1,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":15,"col":5,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":14,"col":2,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":3,"sizeY":1,"row":15,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":3,"sizeY":1,"row":16,"col":0,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":14,"col":0,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":13,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":12,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":11,"col":0,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":10,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":8,"col":0,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":7,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":6,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget1","name":"iFrame Widget1","sizeX":1,"sizeY":1,"row":5,"col":0,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":4,"col":1,"isMaximized":false},{"widgetType":"Chart_Line_Widget","name":"Chart Line Widget","sizeX":1,"sizeY":1,"row":4,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":3,"col":0,"isMaximized":false},{"widgetType":"Generic_Widget","name":"Generic Widget","sizeX":1,"sizeY":1,"row":1,"col":0,"isMaximized":false},{"widgetType":"Custom_Widget","name":"Custom Widget","sizeX":1,"sizeY":1,"row":0,"col":0,"isMaximized":false},{"widgetType":"iFrame_Widget2","name":"iFrame Widget2","sizeX":1,"sizeY":1,"row":9,"col":0,"isMaximized":false}]
        $scope.standardItems = [
            {
                widgetType: 'iFrame_Widget1',
                name: 'iFrame Widget1',
                sizeX: 6,
                sizeY: 3,
                row: 4,
                col: 0, //draggable: false, resizable: false, isMovable: false // TODO: add to the gridster-directive
                isMaximized: false//,
                //maxSizeX: 2,
                //maxSizeY: 2,
                //minSizeX: 2,
                //minSizeY: 2
            }, {
                widgetType: 'iFrame_Widget2',
                widgetUrl: 'https://www.w3.org/',
                name: 'iFrame Widget2',
                sizeX: 3,
                sizeY: 2,
                row: 2,
                col: 4,
                isMaximized: false
            },{
                widgetType: 'Chart_Line_Widget',
                name: 'Chart Line Widget',
                sizeX: 3,
                sizeY: 2,
                row: 2,
                col: 0,
                isMaximized: false
            },{
                widgetType: 'Chart_Line_Widget',
                name: 'Chart Line Widget',
                sizeX: 4,
                sizeY: 2,
                row: 0,
                col: 2,
                isMaximized: false
            },{
                widgetType: 'Custom_Widget',
                name: 'Custom Widget',
                sizeX: 2,
                sizeY: 2,
                row: 0,
                col: 0,
                isMaximized: false
            }];

        // these map directly to gridsterItem options
        $scope.standardItems2 = [
            {
            widgetType: 'iframeWidget',
            name: 'Header',
            sizeX: 2,
            sizeY: 1,
            row: 0,
            col: 0
        }, {
            widgetType: 'chartLineWidget',
            name: 'Header',
            sizeX: 2,
            sizeY: 2,
            row: 0,
            col: 2
        }, {
            widgetType: 'chartLineWidget',
            name: 'Header',
            sizeX: 2,
            sizeY: 1,
            row: 2,
            col: 1
        }, {
            widgetType: 'iframeWidget',
            name: 'Header',
            sizeX: 1,
            sizeY: 1,
            row: 2,
            col: 3
        }, {
            widgetType: 'chartLineWidget',
            name: 'Header',
            sizeX: 1,
            sizeY: 1,
            row: 2,
            col: 4
        }, {
            widgetType: 'iframeWidget',
            name: 'Header',
            sizeX: 1,
            sizeY: 1,
            row: 0,
            col: 4
        }, {
            widgetType: 'iframeWidget',
            name: 'Header',
            sizeX: 1,
            sizeY: 1,
            row: 0,
            col: 5
        }, {
            widgetType: 'chartLineWidget',
            name: 'Header',
            sizeX: 2,
            sizeY: 1,
            row: 1,
            col: 0
        }, {
            widgetType: 'iframeWidget',
            name: 'Header',
            sizeX: 1,
            sizeY: 1,
            row: 1,
            col: 4
        }, {
            widgetType: 'chartLineWidget',
            name: 'Header',
            sizeX: 1,
            sizeY: 2,
            row: 1,
            col: 5
        }, {
            widgetType: 'iframeWidget',
            name: 'Header',
            sizeX: 1,
            sizeY: 1,
            row: 2,
            col: 0
        }];

        // these are non-standard, so they require mapping options
        $scope.customItems = [
            {
            size: {
                x: 2,
                y: 1
            },
            position: [0, 0]
        }, {
            size: {
                x: 2,
                y: 2
            },
            position: [0, 2]
        }, {
            size: {
                x: 1,
                y: 1
            },
            position: [1, 4]
        }, {
            size: {
                x: 1,
                y: 2
            },
            position: [1, 5]
        }, {
            size: {
                x: 1,
                y: 1
            },
            position: [2, 0]
        }, {
            size: {
                x: 2,
                y: 1
            },
            position: [2, 1]
        }, {
            size: {
                x: 1,
                y: 1
            },
            position: [2, 3]
        }, {
            size: {
                x: 1,
                y: 1
            },
            position: [0, 4]
        }, {
            size: {
                x: 1,
                y: 1
            },
            position: [0, 5]
        }, {
            size: {
                x: 2,
                y: 1
            },
            position: [1, 0]
        }, {
            size: {
                x: 1,
                y: 1
            },
            position: [2, 4]
        }];

        $scope.emptyItems = [
            {
            name: 'Item1'
        }, {
            name: 'Item2'
        }, {
            name: 'Item3'
        }, {
            name: 'Item4'
        }];

        // map the gridsterItem to the custom item structure
        $scope.customItemMap = {
            sizeX: 'item.size.x',
            sizeY: 'item.size.y',
            row: 'item.position[0]',
            col: 'item.position[1]'
        };

    }])
    .directive('integer', function() {
        return {
            require: 'ngModel',
            link: function(scope, ele, attr, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
                        return null;
                    }
                    return parseInt(viewValue, 10);
                });
            }
        };
    })
    // helper code
    .filter('object2Array', function() {
            return function(input) {
                var out = [];
                for (i in input) {
                    out.push(input[i]);
                }
                return out;
            }
        });
})();
//
//angular.module('app')
//.controller('DashboardCtrl', ['$scope', '$timeout',
//	function($scope, $timeout) {
//		$scope.gridsterOptions = {
//			margins: [20, 20],
//			columns: 4,
//			draggable: {
//				handle: 'h3'
//			}
//		};
//
//		$scope.dashboards = {
//			'1': {
//				id: '1',
//				name: 'Home',
//				widgets: [{
//					col: 0,
//					row: 0,
//					sizeY: 1,
//					sizeX: 1,
//					name: "Widget 1"
//				}, {
//					col: 2,
//					row: 1,
//					sizeY: 1,
//					sizeX: 1,
//					name: "Widget 2"
//				}]
//			},
//			'2': {
//				id: '2',
//				name: 'Other',
//				widgets: [{
//					col: 1,
//					row: 1,
//					sizeY: 1,
//					sizeX: 2,
//					name: "Other Widget 1"
//				}, {
//					col: 1,
//					row: 3,
//					sizeY: 1,
//					sizeX: 1,
//					name: "Other Widget 2"
//				}]
//			}
//		};
//
//		$scope.clear = function() {
//			$scope.dashboard.widgets = [];
//		};
//
//		$scope.addWidget = function() {
//			$scope.dashboard.widgets.push({
//				name: "New Widget",
//				sizeX: 1,
//				sizeY: 1
//			});
//		};
//
//		$scope.$watch('selectedDashboardId', function(newVal, oldVal) {
//			if (newVal !== oldVal) {
//				$scope.dashboard = $scope.dashboards[newVal];
//			} else {
//				$scope.dashboard = $scope.dashboards[1];
//			}
//		});
//
//		// init dashboard
//		$scope.selectedDashboardId = '1';
//
//	}
//])
//.controller('CustomWidgetCtrl', ['$scope', '$modal',
//	function($scope, $modal) {
//
//		$scope.remove = function(widget) {
//			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
//		};
//
//		$scope.openSettings = function(widget) {
//			$modal.open({
//				scope: $scope,
//				templateUrl: 'demo/dashboard/widget_settings.html',
//				controller: 'WidgetSettingsCtrl',
//				resolve: {
//					widget: function() {
//						return widget;
//					}
//				}
//			});
//		};
//
//	}
//])
//.controller('WidgetSettingsCtrl', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
//	function($scope, $timeout, $rootScope, $modalInstance, widget) {
//		$scope.widget = widget;
//
//		$scope.form = {
//			name: widget.name,
//			sizeX: widget.sizeX,
//			sizeY: widget.sizeY,
//			col: widget.col,
//			row: widget.row
//		};
//
//		$scope.sizeOptions = [{
//			id: '1',
//			name: '1'
//		}, {
//			id: '2',
//			name: '2'
//		}, {
//			id: '3',
//			name: '3'
//		}, {
//			id: '4',
//			name: '4'
//		}];
//
//		$scope.dismiss = function() {
//			$modalInstance.dismiss();
//		};
//
//		$scope.remove = function() {
//			$scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
//			$modalInstance.close();
//		};
//
//		$scope.submit = function() {
//			angular.extend(widget, $scope.form);
//
//			$modalInstance.close(widget);
//		};
//
//	}
//])
//.controller('MainCtrl', function($scope) {
//
//	$scope.gridsterOpts = {
//		margins: [20, 20],
//		outerMargin: false,
//		pushing: true,
//		floating: true,
//		draggable: {
//			enabled: false
//		},
//		resizable: {
//			enabled: false,
//			handles: ['n', 'e', 's', 'w', 'se', 'sw']
//		}
//	};
//
//	// these map directly to gridsterItem options
//	$scope.standardItems = [{
//		sizeX: 2,
//		sizeY: 1,
//		row: 0,
//		col: 0
//	}, {
//		sizeX: 2,
//		sizeY: 2,
//		row: 0,
//		col: 2
//	}, {
//		sizeX: 2,
//		sizeY: 1,
//		row: 2,
//		col: 1
//	}, {
//		sizeX: 1,
//		sizeY: 1,
//		row: 2,
//		col: 3
//	}, {
//		sizeX: 1,
//		sizeY: 1,
//		row: 2,
//		col: 4
//	}, {
//		sizeX: 1,
//		sizeY: 1,
//		row: 0,
//		col: 4
//	}, {
//		sizeX: 1,
//		sizeY: 1,
//		row: 0,
//		col: 5
//	}, {
//		sizeX: 2,
//		sizeY: 1,
//		row: 1,
//		col: 0
//	}, {
//		sizeX: 1,
//		sizeY: 1,
//		row: 1,
//		col: 4
//	}, {
//		sizeX: 1,
//		sizeY: 2,
//		row: 1,
//		col: 5
//	}, {
//		sizeX: 1,
//		sizeY: 1,
//		row: 2,
//		col: 0
//	}];
//
//	// these are non-standard, so they require mapping options
//	$scope.customItems = [{
//		size: {
//			x: 2,
//			y: 1
//		},
//		position: [0, 0]
//	}, {
//		size: {
//			x: 2,
//			y: 2
//		},
//		position: [0, 2]
//	}, {
//		size: {
//			x: 1,
//			y: 1
//		},
//		position: [1, 4]
//	}, {
//		size: {
//			x: 1,
//			y: 2
//		},
//		position: [1, 5]
//	}, {
//		size: {
//			x: 1,
//			y: 1
//		},
//		position: [2, 0]
//	}, {
//		size: {
//			x: 2,
//			y: 1
//		},
//		position: [2, 1]
//	}, {
//		size: {
//			x: 1,
//			y: 1
//		},
//		position: [2, 3]
//	}, {
//		size: {
//			x: 1,
//			y: 1
//		},
//		position: [0, 4]
//	}, {
//		size: {
//			x: 1,
//			y: 1
//		},
//		position: [0, 5]
//	}, {
//		size: {
//			x: 2,
//			y: 1
//		},
//		position: [1, 0]
//	}, {
//		size: {
//			x: 1,
//			y: 1
//		},
//		position: [2, 4]
//	}];
//
//	$scope.emptyItems = [{
//		name: 'Item1'
//	}, {
//		name: 'Item2'
//	}, {
//		name: 'Item3'
//	}, {
//		name: 'Item4'
//	}];
//
//	// map the gridsterItem to the custom item structure
//	$scope.customItemMap = {
//		sizeX: 'item.size.x',
//		sizeY: 'item.size.y',
//		row: 'item.position[0]',
//		col: 'item.position[1]'
//	};
//
//})
//.directive('integer', function() {
//	return {
//		require: 'ngModel',
//		link: function(scope, ele, attr, ctrl) {
//			ctrl.$parsers.unshift(function(viewValue) {
//				if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
//					return null;
//				}
//				return parseInt(viewValue, 10);
//			});
//		}
//	};
//})
//// helper code
//.filter('object2Array', function() {
//	return function(input) {
//		var out = [];
//		for (i in input) {
//			out.push(input[i]);
//		}
//		return out;
//	}
//});