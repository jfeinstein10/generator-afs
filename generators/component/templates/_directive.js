'use strict';

angular.module('<%= angularAppName %>').directive('<%= directiveName %>', function() {
  return {
    restrict: 'EAC',
    templateUrl: '/static/app/<%= pageName %>/directives/<%= directiveName %>.html',
    link: function(scope, element, attrs) {
      scope.message = 'Hello, world';
    }
  };
});
