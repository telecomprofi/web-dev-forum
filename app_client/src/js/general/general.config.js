'use strict';

function GeneralConfig($stateProvider, $httpProvider) {
  'ngInject';
  
  $stateProvider
  .state('app.general', {
    url: '/',
    templateUrl: 'src/js/general/general.html',
    controller: 'GeneralCtrl',
    controllerAs: '$ctrl',
    title: 'General',
    resolve: {
      role: function(User) {
        return User.checkRole();
      }
    }
  });
  
}

export default GeneralConfig;
