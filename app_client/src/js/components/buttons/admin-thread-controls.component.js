'use strict';

class AdminThreadControlsCtrl {
  constructor($uibModal, $state) {
    'ngInject';

    this._$uibModal = $uibModal;
    this._$state = $state;
    
  }

  /**
   * Edits a single thread.
   * @param {Object} thread
   * @returns void
   */
  editThread(thread) {
    this.openEditThread(thread, this.isAdmin, this.topicId);
  }

  /**
   * Removes a single thread.
   * @param {Object} thread
   * @returns void
   */
  deleteThread(thread) {
    this.openDeleteThread(thread);
  }
  
  /**
   * Opens a modal for editing a single thread.
   * @param {Object} thread
   * @returns void
   */
  openEditThread(thread, isAdmin, topicId) {
    let modalInstance = this._$uibModal.open({
      component: 'editThread',
      resolve: {
        thread: function () {
          return thread;
        },
        isAdmin: function () {
          return isAdmin;
        },
        topicId: function () {
          return topicId;
        },
        topicList: function(Topic) {
          return Topic.getTopicsTitles().then(
            (topics) => topics,
            (error) => {
              return null;
            }
          );
        }
      }
    });

    modalInstance.result.then((updatedThread) => {
      if (updatedThread) {
        
        if (this.currentState === 'thread') {

          if (topicId !== updatedThread.topic) {
            this._$state.go(this._$state.current, 
                            { topicId: updatedThread.topic, threadId: updatedThread._id }, 
                            { notify: false, inherit: false, location: 'replace' });
          } else {
            this.reloadPage();
          }
        } else {
          this.reloadPage();
        }
        
      }
    });
  }

  /**
   * Opens a modal for deleting a single thread.
   * @param {Object} thread
   * @returns void
   */
  openDeleteThread(thread) {
    let modalInstance = this._$uibModal.open({
      component: 'deleteThread',
      resolve: {
        thread: function () {
          return thread;
        }
      }
    });

    modalInstance.result.then((removedThread) => {
      if (!removedThread) {
        if (this.currentState === 'thread') {
          this._$state.go('^.topic', { topicId: this.topicId });
        } else {
          this.reloadPage();
        }
      }
    });
  }
  
  /**
   * Reloads the page.
   * @returns void
   */
  reloadPage() {
    this.onReload();
  }
}

let AdminThreadControls = {
  bindings: {
    thread: '=',
    isAdmin: '<',
    currentState: '<',
    topicId: '<',
    onReload: '&'
  },
  controller: AdminThreadControlsCtrl,
  templateUrl: 'src/js/components/buttons/admin-thread-controls.html'
};

export default AdminThreadControls;
