/**
 * Created by saharza on 27/01/2016.
 */
(function() {
    function MyController($sce, portletEventService) {
        var self = this;
        self.$sce = $sce;
        self.lastSrc;
        self.widgetSrc;
        self.url;

        portletEventService.subscribeToEvent('TEST', function(event, argsNewSrc){
            if(self.widgetSrc !== argsNewSrc) {
                self.lastSrc = self.widgetSrc;
                self.widgetSrc = argsNewSrc;
            }else{
                self.widgetSrc = self.lastSrc;
            }
        });
    }

    MyController.$inject = ['$sce', 'portletEventService'];
    Object.defineProperty(MyController.prototype, "url", {
        enumerable: true,
        configurable: false,
        get: function () {
            return this.$sce.trustAsResourceUrl(this.widgetSrc);
        },
        set: function (val) {
            if(!val){
                this.url = this.$sce.trustAsResourceUrl('https://www.w3.org/');
            }else {
                this.url = this.$sce.trustAsResourceUrl(val);
            }
        }
    });

    angular.module('app')
        .component('iframeWidget',  {
            restrict: "E",
            bindings: {
                widgetSrc: '@'
            },
            controller: MyController,
            // TODO: this code was removed to use the javascript version => Object.defineProperty
            //    ['$scope', '$sce', 'portletEventService', function ($scope, $sce, portletEventService) {
            //    var self = this;
            //    self.lastSrc;
            //
            //    portletEventService.subscribeToEvent('TEST', function(event, argsNewSrc){
            //        if(self.widgetSrc !== argsNewSrc) {
            //            self.lastSrc = self.widgetSrc;
            //            self.widgetSrc = argsNewSrc;
            //        }else{
            //            self.widgetSrc = self.lastSrc;
            //        }
            //    });
            //
            //    $scope.$watch(function(){
            //        return self.widgetSrc;
            //    }, function(newVal, oldVal){
            //        if(!newVal){
            //            newVal = 'https://www.w3.org/';
            //        }
            //        self.url = $sce.trustAsResourceUrl(newVal);
            //    });
            //}],
            controllerAs: '$ctrl',
            //transclude: true,
            template: function(){
                return '<iframe ng-src="{{$ctrl.url}}" ></iframe>'; //<ng-transclude></ng-transclude>
            }
        })
        .component('chartLineWidget',  {
            restrict: "E",
            //bindings: {
            //    publishEvent: '&',
            //    subscribeEvent: '&'
            //},
            //require: ['^^gridsterItem'],
            //require: {
            //    gridsterItemCtrl: '^gridsterItem'
            //},
            controller: ['$timeout', 'portletEventService',function ($timeout, portletEventService) {
                var self = this;

                self.labels = ["January", "February", "March", "April", "May", "June", "July"];
                self.series = ['Series A', 'Series B'];
                self.data = [
                    [65, 59, 80, 81, 56, 55, 40],
                    [28, 48, 40, 19, 86, 27, 90]
                ];
                self.onClick = function (points, evt) {
                    portletEventService.publishEvent('TEST', 'https://rawgit.com/ManifestWebDesign/angular-gridster/master/index.html#/main');

                    // Simulate async data update
                    $timeout(function () {
                        self.data = [
                            [28, 48, 40, 19, 86, 27, 90],
                            [65, 59, 80, 81, 56, 55, 40]
                        ];
                    }, 1500);
                };
            }],
            controllerAs: '$ctrl',
            template: function(){
                return '<canvas id="line" class="chart chart-line" chart-data="$ctrl.data" chart-labels="$ctrl.labels" chart-legend="true" chart-series="$ctrl.series" chart-click="$ctrl.onClick"></canvas>';
            }
        })
        .component('customWidget',  {
            restrict: "E",
            controller:['$scope', '$timeout', '$modal', '$http', function ($scope, $timeout, $modal, $http) {
                var self = this;
                self.gridOptions = {};
                self.isInitial = true;
                self.isLoading = false;

                // [ui-grid]: you can override the default assignment if you wish
                self.gridOptions.appScopeProvider = self;

                self.getData = function getData(){
                    self.isLoading = true;
                    $http.get('http://1.9.84.51:8080/activiti-rest/service/runtime/tasks?includeProcessVariables=true&start=0&size=300', {
                        'Authorization': 'Basic b2ZpcnJvdGg6bmljZWN0aQ==',
                        'Accept': 'application/json'
                    }).then(function successCallback(data){
                        var newColl = [];
                        for(var i = 0; i < data.data.data.length; i++){
                            if(data.data.data[i].formKey === "EvaluationForm01"){
                                data.data.data[i].isClaimStarted = false;
                                data.data.data[i].sendForm = false;
                                data.data.data[i].sendFormSuccess = false;
                                data.data.data[i].isClaimFinish = data.data.data[i].assignee === 'ofirroth' || false;
                                newColl.push(data.data.data[i]);
                            }
                        }
                        $timeout(function(){
                            self.gridOptions.data = newColl;
                            //data: data.data.data,
                            self.gridOptions.columnDefs = [
                                { field: 'name', width: 320 },
                                { name: 'assignee' },{
                                    field: 'status',
                                    cellTemplate: '<div class="ui-grid-cell-contents ngCellText" ng-if="row.entity.assignee !== null">Owned</div><div class="ui-grid-cell-contents button-column" ng-if="row.entity.assignee === null"><div class="busy-indicator-small" ng-if="row.entity.isClaimStarted&&!row.entity.isClaimFinish"></div><button ng-if="!row.entity.isClaimStarted" class="btn btn-info btn-xs button-column" ng-click="grid.appScope.claimActivity(row.entity)">Claim</button></div>'
                                },{
                                    field: 'editable',
                                    width: 130,
                                    cellTemplate: '<div class="ui-grid-cell-contents ngCellText"><div class="success-hand-icon" ng-if="row.entity.sendFormSuccess"></div><div class="busy-indicator-small editable" ng-if="row.entity.sendForm"></div><button ng-if="row.entity.isClaimFinish && !row.entity.sendFormSuccess && !row.entity.sendForm" class="btn btn-info btn-xs button-column" ng-click="grid.appScope.editActivity(row.entity)">Evaluate</button></div>'
                                }];
                            self.isInitial = false;
                        }, 3000);
                    }, function errorCallback(errorData){
                        alert("error");
                    });
                };

                self.editActivity = function editActivity(entity){
                    console.log(entity.id);
                    self.openDialog(entity);
                };

                self.claimActivity = function claimActivity(entity){
                    entity.isClaimStarted = true;
                    $http.post('http://1.9.84.51:8080/activiti-rest/service/runtime/tasks/' + entity.id,
                        { "action":"claim", "assignee":"ofirroth" }, // request body
                        {   'Authorization': 'Basic b2ZpcnJvdGg6bmljZWN0aQ==',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }).then(function successCallback(data){
                            // TODO add another req for the text editor...
                            $timeout(function(){
                                entity.assignee = 'ofirroth';
                                entity.isClaimFinish = true;
                            },2000);
                        },
                        function errorCallback(errorData){
                            alert("error");
                        });
                };

                self.completeTask = function completeTask(entity){
                    entity.sendForm = true;
                    $http.post('http://1.9.84.51:8080/activiti-rest/service/runtime/tasks/' + entity.id,
                        { "action":"complete", // request body
                          "variables": [{
                              "name": "question02",
                              "value": entity.question02
                          }]
                        },
                        {   'Authorization': 'Basic b2ZpcnJvdGg6bmljZWN0aQ==',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }).then(function successCallback(data){
                            $timeout(function(){
                                $timeout(function() {
                                    var index = self.gridOptions.data.indexOf(entity);
                                    self.gridOptions.data.splice(index, 1);
                                }, 3000);
                                entity.isClaimFinish = true;
                                entity.sendForm = false;
                                entity.sendFormSuccess = true;
                            },3000);
                        },
                        function errorCallback(errorData){
                            alert("error");
                        });
                };

                self.openDialog = function(widget) {
                    $modal.open({
                        scope: $scope,
                        //template: '<div class="static-template">STATIC HTML</div>',
                        templateUrl: '../templates/widget_form_activity.html',
                        controller: 'activityEditCtrl',
                        resolve: {
                            widget: function() {
                                return widget;
                            }
                        }
                    }).result.then(function (entity) {
                            self.completeTask(entity);
                    }, function () {
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };
            }],
            controllerAs: '$ctrl',
            templateUrl: '../templates/custom_widget.html'
        })
        .directive('widgetContentHandler',  ['$compile', 'widgetTemplatesProvider', function factory($compile, widgetTemplatesProvider) {
            var directiveObject = {
                restrict: "EA",
                require: '^^gridster-item',
                scope:{
                    widget: '=widget'
                },
                controller: function () {
                    // TODO: CTRl work...
                },
                controllerAs: '$ctrl',
                link: function($scope, $element, $attrs, gridsterItemCtrl){
                    //console.log(gridsterItemCtrl);

                    $scope.$watch(function(){
                            return $scope.widget.widgetType;
                    },function(newVal, oldVal){
                        // Step 1: parse HTML into DOM element
                        var template = angular.element(widgetTemplatesProvider[newVal]),
                        // Step 2: compile the template
                            linkFn = $compile(template);
                        // Step 3: link the compiled template with the scope.
                        $element.html(linkFn($scope));
                    });
                }
                //compile: function($element, $attrs){
                //    console.log($attrs);
                //
                //    return {
                //        pre: function preLink(scope, iElement, iAttrs, controller) { },
                //        post: function postLink(scope, iElement, iAttrs, controller) { }
                //    }
                //}
            };
            return directiveObject;
        }]);

})();