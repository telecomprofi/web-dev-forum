'use strict';

class ThreadControlsCtrl {
  constructor(User, $uibModal, $state) {
    'ngInject';

    this._$uibModal = $uibModal;
    this._$state = $state;

    if (!this.isAdmin) {
      if (!this.isUser) {
        this.isGuest = true;
      } else {
        if (User.current.banned === true) {
          this.isGuest = true;
        } else {
          this.isGuest = false;
        }
      }
    } else {
      this.isGuest = false;
    }
    
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
   * Quotes the thread description.
   * @param {String} description
   * @returns void
   */
  quoteThread(description) {
    this.onInsertQuote({quote: description});
  }
  
  /**
   * Reloads the page.
   * @returns void
   */
  reloadPage() {
    this.onReload();
  }
}

let ThreadControls = {
  bindings: {
    thread: '=',
    isAdmin: '<',
    isUser: '<',
    isThreadAuthor: '<',
    topicId: '<',
    onAddLike: '&',
    onAddDislike: '&',
    onInsertQuote: '&',
    onReload: '&'
  },
  controller: ThreadControlsCtrl,
  templateUrl: 'src/js/components/buttons/thread-controls.html'
};

export default ThreadControls;
