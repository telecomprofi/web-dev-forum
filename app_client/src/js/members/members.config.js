'use strict';

function MembersConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider
  .state('app.members', {
    url: '/members',
    templateUrl: 'src/js/members/members.html',
    controller: 'MembersCtrl',
    controllerAs: '$ctrl',
    title: 'Member List',
    resolve: {
      role: function(User) {
        return User.checkRole();
      }
    }
  });
  
}

export default MembersConfig;