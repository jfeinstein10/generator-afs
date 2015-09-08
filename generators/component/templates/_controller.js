'use strict';

angular.module('<%= angularAppName %>')
    .controller('<%= controllerName %>', <%= controllerName %>);

function <%= controllerName %>() {
  this.message = 'Hello, world';
}