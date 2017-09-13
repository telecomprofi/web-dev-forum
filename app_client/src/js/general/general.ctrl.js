'use strict';

/** Class representing a controller of home page. */
class GeneralCtrl {
  constructor(role, User, Topic, $scope, AppConstants, $uibModal, $state) {
    'ngInject';
    
    this._role = role;
    
    if (User.current && this._role) {
      this.isAdmin = (User.current.role === AppConstants.roleAdmin);
      this.isUser = (User.current.role === AppConstants.roleUser);
      this.isUserBanned = User.current.banned;
    } else {
      this.isAdmin = false;
      this.isUser = false;
      this.isUserBanned = false;
    }
  
    this._Topic = Topic;
    this._$uibModal = $uibModal;
    this._$state = $state;
    
    this.currentState = $state.current.name.replace('app.', '');
    
    this.errorMessage = '';
    
    this.renderTopics();
    
  }
 
  /**
   * Renders the list of topics.
   * @returns void
   */
  renderTopics() {
    this._Topic
      .getTopicList()
      .then(
        (topics) => {
          this.topics = topics;
          
          if (this.topics.length === 0) {
            this.errorMessage = 'No topics yet.';
          } else {
            this.errorMessage = '';
          }
        }
      )
      .catch(
        (error) => {
          this.errorMessage = error.data.message;
        }
      );
  }

  /**
   * Reloads the general page.
   * @returns void
   */
  reload() {
    this._$state.go('app.general', null, { reload: true });
  }

  /**
   * Opens a modal for adding a single topic.
   * @returns void
   */
  openAddTopic() {
    let modalInstance = this._$uibModal.open({
      component: 'addTopic'
    });

    modalInstance.result.then((newTopic) => {
      if (newTopic) {
        this.reload();
      }
    });
  }

}

export default GeneralCtrl;
