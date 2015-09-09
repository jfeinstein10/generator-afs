'use strict';

angular
  .module('<%= angularAppName %>', [
    <%= angularModules.join(',\n    ') + ',' %>
    /* angular-flask module needle */
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      /* angular-flask route needle */;
  });
