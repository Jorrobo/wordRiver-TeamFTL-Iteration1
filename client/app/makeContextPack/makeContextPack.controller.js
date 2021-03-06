'use strict';

angular.module('wordRiverTeamFtlApp')
  .controller('MakeContextPackCtrl', function ($scope, $http, socket) {
    $scope.contextPack = [];
    $scope.nameField = "";
    $scope.gradeLevel = "";
    $scope.words = [];
    $scope.setUp = true;
    $scope.addWordField = '';

    $http.get('/api/contextPacks').success(function(contextPacks) {
      $scope.contextPack = contextPacks;
      socket.syncUpdates('contextPack', $scope.contextPacks);
    });

    //Used to submit all information to the context pack
    $scope.addContextPack = function() {
      //Checks for correct input
      if($scope.nameField.length < 3 || $scope.nameField.length > 30) {
        alert("Your pack's name needs to be greater than 2 characters, and less than 30.");
        return;
      }else if($scope.gradeLevel === ''){
        alert("You need to select a recommended grade level.");
        return;
      }
      $http.post('/api/contextPacks', {name: $scope.nameField, gradeLevel: $scope.gradeLevel, words: $scope.words});
      $scope.newPack = '';
      window.location="/dashboard";
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/contextPacks/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('contextPack');
    });

    $scope.changeGradeLevel = function(str){
      $scope.gradeLevel = str;
    };

    //Used when preliminary settings are submitted
    $scope.changeView = function(){
      if($scope.nameField.length < 3 || $scope.nameField.length > 30) {
        alert("Your pack's name needs to be greater than 2 characters, and less than 30.");
      }else if($scope.gradeLevel === ''){
        alert("You need to select a recommended grade level.");
      } else{
        $scope.setUp = false;
      }
    };

    //Used to add a word to the context pack
    $scope.addWord = function(){
      if($scope.addWordField.length <= 0){
        alert("You need to enter a word.");
      }else{
        $scope.words.push($scope.addWordField);
        $scope.addWordField = "";
      }
    }
});
