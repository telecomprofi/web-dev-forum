'use strict';

class TopicItemCtrl {
  constructor(Topic, $uibModal, $state) {
    'ngInject';

    this._Topic = Topic;
    this._$uibModal = $uibModal;
    this._$state = $state;
    
  }

  /**
   * Edits a single topic.
   * @param {Object} topic
   * @returns void
   */
  editTopic(topic) {
    this.openEditTopic(topic);
  }

  /**
   * Removes a single topic.
   * @param {Object} topic
   * @returns void
   */
  removeTopic(topic) {
    this.openRemoveTopic(topic);
  }

  /**
   * Opens a modal for editing a single topic.
   * @param {Object} topic
   * @returns void
   */
  openEditTopic(topic) {
    let modalInstance = this._$uibModal.open({
      component: 'editTopic',
      resolve: {
        topic: function () {
          return topic;
        }
      }
    });

    modalInstance.result.then((updatedTopic) => {
      if (updatedTopic) {
        this.reloadPage();
      }
    });
  }

  /**
   * Opens a modal for removing a single topic.
   * @param {Object} topic
   * @returns void
   */
  openRemoveTopic(topic) {
    let modalInstance = this._$uibModal.open({
      component: 'removeTopic',
      resolve: {
        topic: function () {
          return topic;
        }
      }
    });

    modalInstance.result.then((removedTopic) => {
      if (!removedTopic) {
        this._$state.go('app.general', null, { reload: true });
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

let TopicItem = {
  bindings: {
    topic: '=',
    isAdmin: '<',
    currentState: '<',
    onReload: '&'
  },
  controller: TopicItemCtrl,
  templateUrl: 'src/js/components/topic-item.html'
};

export default TopicItem;
