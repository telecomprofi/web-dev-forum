'use strict';

function ThreadConfig($stateProvider, $httpProvider) {
  'ngInject';
    
  $stateProvider
  .state('app.thread', {
    url: '/topic/:topicId/threads/:threadId',
    templateUrl: 'src/js/thread/thread.html',
    controller: 'ThreadCtrl',
    controllerAs: '$ctrl',
    title: 'Thread',
    resolve: {
      role: function(User) {
        return User.checkRole();
      },
      thread: function(Thread, $state, $stateParams) {
        if ($stateParams.topicId && $stateParams.threadId) {
          return Thread.getThread($stateParams.topicId, $stateParams.threadId).then(
            (thread) => thread,
            (error) => $state.go('app.general')
          );
        } else {
          return null;
        }
      }
    }
  });
  
}

export default ThreadConfig;
