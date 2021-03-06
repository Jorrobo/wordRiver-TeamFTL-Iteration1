/**
 * Created by lynch446 on 2/27/15.
 */
'use strict';

angular.module('wordRiverTeamFtlApp')
  .controller('ProfileCtrl', function ($rootScope, $scope, $http, socket) {
    $scope.currentStudent = $rootScope.currentStudent;
    console.log($scope.currentStudent);

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.students = awesomeThings;
      socket.syncUpdates('thing', $scope.students);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
