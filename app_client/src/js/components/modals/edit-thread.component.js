'use strict';

class EditThreadCtrl {
  constructor(Thread) {
    'ngInject';
    
    this.title = 'Edit Thread';
    this._Thread = Thread;
    this.isChanged = false;
    this.isSelected = false;

  }
  
  $onInit() {
    this.thread = this.resolve.thread;
    this.isAdmin = this.resolve.isAdmin;
    this.topicId = this.resolve.topicId;
    this.topicList = this.resolve.topicList;
    
    this.selectedTopic = getSelectedTopic(this.topicList, this.topicId);
    
    this.duplicateThreadTitle = this.thread.title;
    this.duplicateThreadDescription = this.thread.description;
    
    function getSelectedTopic(topics, currentTopicId) {
      if (topics) {
        for (let topic of topics) {
          if (topic._id === currentTopicId) {
            return topic;
          }
        }
      }
      return null;
    }
  }
  
  onInputChange() {
    this.isChanged = true;
  }

  onSelectChange() {
    this.isSelected = true;
  }
  
  submitEditForm() {
    this.isSubmitting = true;
    this.errorMessage = '';
 
    if (this.isSelected) {
      this.thread.topic._id = this.selectedTopic._id || null;
      if (this.thread.topic._id === null) {
        this.errorMessage = 'There is no possibility to choose a topic';
        this.thread.topic._id = this.resolve.thread.topic._id;
        this.isSubmitting = false;
        return false;
      }
    }
    
    if (this.isChanged || this.isSelected) {
      if (!this.thread.title || !this.thread.description) {
        this.errorMessage = 'Please note, all the fields required';
        this.isSubmitting = false;
        return false;
      } else {
        this._Thread.updateThread(this.topicId, this.thread._id, this.thread)
          .then(
          (updatedThread) => {
            this.ok(updatedThread);
          },
          (error) => {
            this.isSubmitting = false;
            this.errorMessage = error.data.message;
            this.thread.title = this.duplicateThreadTitle;
            this.thread.description = this.duplicateThreadDescription;
            this.selectedTopic = null;
            this.isChanged = false;
            this.isSelected = false;
          }
        );

        return false;
      }
    } else {
      this.cancel();
    }
    
  }

  ok(data) {
    this.close({$value: data});
  }
  
  cancel() {
    this.thread.title = this.duplicateThreadTitle;
    this.thread.description = this.duplicateThreadDescription;
    this.dismiss({$value: 'cancel'});
  }

}

let EditThread = {
  controller: EditThreadCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/components/modals/edit-thread.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default EditThread;
