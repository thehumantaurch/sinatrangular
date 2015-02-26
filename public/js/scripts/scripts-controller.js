'use strict';

angular.module('linecall')
  .controller('ScriptsController', ['$scope', '$modal', 'resolvedScripts', 'Scripts',
    function ($scope, $modal, resolvedScripts, Scripts) {

      $scope.scripts = resolvedScripts;

      $scope.create = function () {
        $scope.clear();
        $scope.open();
      };

      $scope.update = function (id) {
        $scope.scripts = Scripts.get({id: id});
        $scope.open(id);
      };

      $scope.delete = function (id) {
        Scripts.delete({id: id},
          function () {
            $scope.scripts = Scripts.query();
          });
      };

      $scope.save = function (id) {
        if (id) {
          Scripts.update({id: id}, $scope.scripts,
            function () {
              $scope.scripts = Scripts.query();
              $scope.clear();
            });
        } else {
          Scripts.save($scope.scripts,
            function () {
              $scope.scripts = Scripts.query();
              $scope.clear();
            });
        }
      };

      $scope.clear = function () {
        $scope.scripts = {
          
          "title": "",
          
          "author": "",
          
          "id": ""
        };
      };

      $scope.open = function (id) {
        var scriptsSave = $modal.open({
          templateUrl: 'scripts-save.html',
          controller: 'ScriptsSaveController',
          resolve: {
            scripts: function () {
              return $scope.scripts;
            }
          }
        });

        scriptsSave.result.then(function (entity) {
          $scope.scripts = entity;
          $scope.save(id);
        });
      };
    }])
  .controller('ScriptsSaveController', ['$scope', '$modalInstance', 'scripts',
    function ($scope, $modalInstance, scripts) {
      $scope.scripts = scripts;

      

      $scope.ok = function () {
        $modalInstance.close($scope.scripts);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    }]);
