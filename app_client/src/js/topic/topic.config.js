'use strict';

function TopicConfig($stateProvider, $httpProvider) {
  'ngInject';
    
  $stateProvider
  .state('app.topic', {
    url: '/topics/:topicId',
    templateUrl: 'src/js/topic/topic.html',
    controller: 'TopicCtrl',
    controllerAs: '$ctrl',
    title: 'Topic',
    resolve: {
      role: function(User) {
        return User.checkRole();
      },
      topic: function(Topic, $state, $stateParams) {
        if ($stateParams.topicId) {
          return Topic.getTopic($stateParams.topicId).then(
            (topic) => topic,
            (error) => $state.go('app.general')
          );
        } else {
          return null;
        }
      }
    }
  });
  
}

export default TopicConfig;
