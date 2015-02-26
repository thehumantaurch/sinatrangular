'use strict';

angular.module('linecall')
  .controller('UsersController', ['$scope', '$modal', 'resolvedUsers', 'Users',
    function ($scope, $modal, resolvedUsers, Users) {

      $scope.users = resolvedUsers;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.users = Users.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Users.delete({id: id},
          function () {
            $scope.users = Users.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Users.update({id: id}, $scope.users,
            function () {
              $scope.users = Users.query();
              $scope.clear();
            });
        } else {
          Users.save($scope.users,
            function () {
              $scope.users = Users.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.users = {
          
          "email": "",
          
          "password": "",
          
          "access_level": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var usersSave = $modal.open({
          templateUrl: 'users-save.html',
          controller: 'UsersSaveController',
          resolve: {
            users: function () {
              return $scope.users;
            }
          }
        });

        usersSave.result.then(function (entity) {
          $scope.users = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('UsersSaveController', ['$scope', '$modalInstance', 'users',
    function ($scope, $modalInstance, users) {
      $scope.users = users;

      

      $scope.ok = function () {
        $modalInstance.close($scope.users);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
