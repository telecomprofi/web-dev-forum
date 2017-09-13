'use strict';

function AppConfig($httpProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';
 
  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'src/js/layout/app-view.html',
    resolve: {
      auth: function(User) {
        return User.verifyAuth().then(authValid => authValid.isAuth);
      }
    }
  });
  
  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
