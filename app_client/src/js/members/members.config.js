function MembersConfig($stateProvider, $httpProvider) {
  'ngInject';

  $stateProvider
  .state('app.members', {
    url: '/members',
    templateUrl: 'src/js/members/members.html',
    controller: 'MembersCtrl',
    controllerAs: '$ctrl',
    title: 'Members'
  });
  
};

export default MembersConfig;