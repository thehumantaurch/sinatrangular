'use strict';

angular.module('linecall')
  .factory('Users', ['$resource', function ($resource) {
    return $resource('linecall/users/:id', {}, {
      'query': { method: 'GET', isArray: true},
      'get': { method: 'GET'},
      'update': { method: 'PUT'}
    });
  }]);
