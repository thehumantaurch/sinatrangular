'use strict';

angular.module('linecall')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/scripts', {
        templateUrl: 'views/scripts/scripts.html',
        controller: 'ScriptsController',
        resolve:{
          resolvedScripts: ['Scripts', function (Scripts) {
            return Scripts.query();
          }]
        }
      })
    }]);
