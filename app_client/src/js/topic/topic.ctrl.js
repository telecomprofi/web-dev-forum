'use strict';

/** Class representing a controller of home page. */
class TopicCtrl {
  constructor(role, topic, User, AppConstants, $uibModal, $state) {
    'ngInject';

    this._role = role;
    this.topic = topic;
    this._$uibModal = $uibModal;

    if (!this.topic) {
      this.errorMessage = 'No topic yet.';
    } else {
      this.errorMessage = '';
    }
    
    if (User.current && this._role) {
      this.isAdmin = (User.current.role === AppConstants.roleAdmin);
      this.isUser = (User.current.role === AppConstants.roleUser);
      this.isUserBanned = User.current.banned;
    } else {
      this.isAdmin = false;
      this.isUser = false;
      this.isUserBanned = false;
    }
    
    this._$state = $state;
    
    this.currentState = $state.current.name.replace('app.', '');

  }

  /**
   * Reloads the topic page.
   * @returns void
   */
  reload() {
    this._$state.go(this._$state.current, {}, {reload: true });
  }

  /**
   * Creates a new thread.
   * @returns void
   */
  createThread(topicId) {
    this.openAddThread(topicId);
  }
  
  /**
   * Opens a modal for adding a single thread.
   * @returns void
   */
  openAddThread(topicId) {
    let modalInstance = this._$uibModal.open({
      component: 'addThread',
      resolve: {
        topicId: function () {
          return topicId;
        }
      }
    });

    modalInstance.result.then((newThread) => {
      if (newThread) {
        this._$state.go('^.thread', 
                        { topicId: newThread.topic, threadId: newThread._id });
      }
    });
  }
  
}

export default TopicCtrl;
