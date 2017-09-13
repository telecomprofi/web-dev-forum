'use strict';

function ProfileConfig($stateProvider, $httpProvider) {
  'ngInject';
  
  $stateProvider
  .state('app.profile', {
    url: '/profiles/:userId',
    controller: 'ProfileCtrl as $ctrl',
    templateUrl: 'src/js/profile/profile.html',
    title: 'My Profile',
    resolve: {
      role: function(User) {
        return User.checkRole();
      },
      profile: function(Profile, $state, $stateParams) {
        if ($stateParams.userId) {
          return Profile.getProfile($stateParams.userId).then(
            (profile) => profile,
            (error) => $state.go('app.general')
          );
        } else {
          return null;
        }
      }
    }
  });
  
}

export default ProfileConfig;
