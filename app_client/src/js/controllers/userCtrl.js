'use strict';

angular.module('Controllers', [])
  .controller('userCtrl', userCtrl)
  userCtrl.$inject = ['userFactory', '$scope', '$rootScope'];

function userCtrl(userFactory, $scope, $rootScope) {
  $scope.getUserList = userFactory.getUserList;
  
  $scope.getUserList().then(function (users) {
    $rootScope.users = users;
    $scope.$digest();
  }).catch(function (error) {
    console.error('Unable to get users');
  });

}