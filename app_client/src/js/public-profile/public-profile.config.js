'use strict';

function PublicProfileConfig($stateProvider, $httpProvider) {
  'ngInject';
  
  $stateProvider
  .state('app.publicProfile', {
    url: '/profiles/:userId/public',
    controller: 'PublicProfileCtrl as $ctrl',
    templateUrl: 'src/js/public-profile/public-profile.html',
    resolve: {
      role: function(User) {
        return User.checkRole();
      },
      profile: function(Profile, $state, $stateParams) {
        if ($stateParams.userId) {
          return Profile.getPublicProfile($stateParams.userId).then(
            (publicProfile) => publicProfile,
            (error) => $state.go('app.general')
          );
        } else {
          return null;
        }
      }
    }
  });
  
}

export default PublicProfileConfig;
