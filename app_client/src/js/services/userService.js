'use strict';

angular.module("Services", [])
  .factory("userFactory", ['$http', function ($http) {
    
  let getUserList = function () {
    return new Promise(function (resolve, reject) {
        $http({
            method: 'GET',
            url: '/api/users'
        }).then(function (response) {
            resolve(response.data);
        }, reject);

    });

  };
  
  return {
    getUserList
  }
}]);