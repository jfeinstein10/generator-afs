'use strict';

angular
  .module('<%= angularAppName %>', [
    <%= angularModules.join(',\n    ') + '\n  ' %>])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '/static/app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      });
  });
