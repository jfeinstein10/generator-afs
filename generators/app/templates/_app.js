'use strict';

angular
  .module('<%= angularAppName %>', [
    <%= angularModules.join(',\n    ') + '\n  ' %>])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/static/partials/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      });
  });
