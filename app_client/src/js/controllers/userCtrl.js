'use strict';

//angular.module('Controllers', [])
//  .controller('userCtrl', userCtrl)
//  userCtrl.$inject = ['userFactory'];
//
//function userCtrl(userFactory) {
//  
//  let _self = this;
//  
//  this.getUserList = userFactory.getUserList;
//  
//  this.getUserList().then(function (res) {
//    _self.users = res;
//  }).catch(function (error) {
//    console.error('Unable to get users');
//  });
//}

angular.module('Controllers', [])
  .controller('userCtrl', userCtrl)
  userCtrl.$inject = ['userFactory', '$scope'];

function userCtrl(userFactory, $scope) {
  $scope.getUserList = userFactory.getUserList;

  $scope.getUserList().then(function (res) {
    $scope.users = res;
    console.log($scope.users);
  }).catch(function (error) {
    console.error('Unable to get users');
  });
}