/**
 * Created by saharza on 22/03/2016.
 */
(function(app){
    app.ChildComponent = app.ng2.core
        .Component({
            selector: 'list-of-names',
            template: '<div class="primary"><ul><li *ngFor="#name of names">{{name}}</li></ul>Add a name: <input type="text" (keyup.enter)="addName($event)"/></div><br/>',
            directives: [app.ng2.common.NgFor],
            styles: ['.primary {border: 3px solid green}']
        })
        .Class({
            constructor: function() {
                this.names = ['John', 'Joe', 'Jeff', 'Jorge'];
            },

            addName: function($event){
                this.names.push($event.target.value);
                $event.target.value = '';
            }
        });

    app.ChildWithParentPropComponent = app.ng2.core
        .Component({
            selector: 'show-parent-prop',
            template: '<span class="primary">{{person.name}}</span>',
            inputs: ['person'],
            styles: ['.primary {border: 3px solid red}']
        })
        .Class({
            constructor: function() {
                //this.person = person;

                setTimeout(function() {
                    this.person.name = 'Title Changed by CHILD...';
                }.bind(this), 4000);
            }
        });

    app.ParentComponent = app.ng2.core
        .Component({
            selector: 'ng2-parent-component',
            template: '<div class="ng2-parent-container"><h1>{{person.name}}</h1>' +
            '<h3><show-parent-prop [person]="person"></show-parent-prop></h3>' +
            '<list-of-names></list-of-names>' +
            'Change title: <input type="text" [(ngModel)]="person.name"></div>',
            directives: [app.ng2.common.FORM_DIRECTIVES, app.ChildWithParentPropComponent, app.ChildComponent]
        })
        .Class({
            constructor: function() {
                this.person = {
                    name: 'Initial Title'
                };

                setTimeout(function() {
                    this.person.name = 'Title Changed by PARENT...';
                }.bind(this), 2000);
            }
        });

})(window.app || (window.app = {}));