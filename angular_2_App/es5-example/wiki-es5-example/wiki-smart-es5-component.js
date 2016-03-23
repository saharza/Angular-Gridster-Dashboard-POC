/**
 * Created by saharza on 22/03/2016.
 */
(function(System) {(function(__moduleName){System.register(['angular2/core', 'angular2/http', 'rxjs/Subject', './wikipedia.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
            var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
            if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
            else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        };
    var __metadata = (this && this.__metadata) || function (k, v) {
            if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
        };
    var core_1, http_1, Subject_1, wikipedia_service_1;
    var WikiSmartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (wikipedia_service_1_1) {
                wikipedia_service_1 = wikipedia_service_1_1;
            }],
        execute: function() {
            WikiSmartComponent = (function () {
                function WikiSmartComponent(_wikipediaService) {
                    var _this = this;
                    this._wikipediaService = _wikipediaService;
                    this._searchTermStream = new Subject_1.Subject();
                    this.items = this._searchTermStream
                        .debounceTime(300)
                        .distinctUntilChanged()
                        .switchMap(function (term) { return _this._wikipediaService.search(term); });
                }
                WikiSmartComponent.prototype.search = function (term) { this._searchTermStream.next(term); };
                WikiSmartComponent = __decorate([
                    core_1.Component({
                        selector: 'my-wiki-smart',
                        template: "\n    <h1>Smarter Wikipedia Demo</h1>\n    <p><i>Fetches when typing stops</i></p>\n\n    <input #term (keyup)=\"search(term.value)\"/>\n\n    <ul>\n      <li *ngFor=\"#item of items | async\">{{item}}</li>\n    </ul>\n  ",
                        providers: [http_1.JSONP_PROVIDERS, wikipedia_service_1.WikipediaService]
                    }),
                    __metadata('design:paramtypes', [(typeof (_a = typeof wikipedia_service_1.WikipediaService !== 'undefined' && wikipedia_service_1.WikipediaService) === 'function' && _a) || Object])
                ], WikiSmartComponent);
                return WikiSmartComponent;
                var _a;
            }());
            exports_1("WikiSmartComponent", WikiSmartComponent);
        }
    }
});
    /*
     Copyright 2016 Google Inc. All Rights Reserved.
     Use of this source code is governed by an MIT-style license that
     can be found in the LICENSE file at http://angular.io/license
     */
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lraS1zbWFydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWtpLXNtYXJ0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQXFCQTtnQkFFRSw0QkFBcUIsaUJBQW1DO29CQUYxRCxpQkFZQztvQkFWc0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtvQkFFaEQsc0JBQWlCLEdBQUcsSUFBSSxpQkFBTyxFQUFVLENBQUM7b0JBSWxELFVBQUssR0FBd0IsSUFBSSxDQUFDLGlCQUFpQjt5QkFDaEQsWUFBWSxDQUFDLEdBQUcsQ0FBQzt5QkFDakIsb0JBQW9CLEVBQUU7eUJBQ3RCLFNBQVMsQ0FBQyxVQUFDLElBQVcsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQW5DLENBQW1DLENBQUMsQ0FBQztnQkFUUCxDQUFDO2dCQUk3RCxtQ0FBTSxHQUFOLFVBQU8sSUFBVyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQXBCNUQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDVCxRQUFRLEVBQUUsZUFBZTt3QkFDekIsUUFBUSxFQUFFLCtOQVNUO3dCQUNELFNBQVMsRUFBQyxDQUFDLHNCQUFlLEVBQUUsb0NBQWdCLENBQUM7cUJBQzlDLENBQUM7O3NDQUFBO2dCQWFGLHlCQUFDOztZQUFELENBQUMsQUFaRCxJQVlDO1lBWkQsbURBWUMsQ0FBQTs7OztBQUdEOzs7O0VBSUUifQ==
})("http://127.0.0.1:8889/angular_2_App/wiki/wiki-smart.component.js");
})(System);