'use strict';

angular.module("forumApp")
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "src/view/general.html"
            }) 
            .when("/register", {
                templateUrl: "src/view/register.html"
            })
            .when("/login", {
                templateUrl: "src/view/login.html"
            })
            .when("/members", {
                templateUrl: "src/view/members.html"
            })
            .when("/thread", {
                templateUrl: "src/view/thread.html"
            })
            .when("/profile", {
                templateUrl: "src/view/profile.html"
            });
  
            $routeProvider.otherwise("/");

    });