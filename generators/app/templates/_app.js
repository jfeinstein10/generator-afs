'use strict';

angular
  .module('<%= angularAppName %>', [
    <%= angularModules.join(',\n    ') + ',' %>
    /* generator-afs module needle */
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      /* generator-afs route needle */;
  });
