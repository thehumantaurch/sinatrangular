'use strict';

angular.module('linecall')
  .factory('Scripts', ['$resource', function ($resource) {
    return $resource('linecall/scripts/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
