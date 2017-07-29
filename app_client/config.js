function AppConfig($httpProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';
  
  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'src/js/layout/app-view.html'
  });
  
  $stateProvider
  .state('app.general', {
    url: '/',
    templateUrl: 'src/js/general/general.html',
    title: 'General'
  });
  
  $stateProvider
  .state('app.thread', {
    url: '/thread',
    templateUrl: 'src/js/thread/thread.html',
    title: 'Thread'
  });
  
  $stateProvider
  .state('app.profile', {
    url: '/profile',
    templateUrl: 'src/js/profile/profile.html',
    title: 'Profile'
  });
  
  $urlRouterProvider.otherwise('/');

}

export default AppConfig;
