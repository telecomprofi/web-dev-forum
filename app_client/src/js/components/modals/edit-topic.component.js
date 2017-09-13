'use strict';

class EditTopicCtrl {
  constructor(Topic) {
    'ngInject';
    
    this.title = 'Edit Topic';
    this._Topic = Topic;
    this.isChanged = false;

  }
  
  $onInit() {
    this.topic = this.resolve.topic;
    this.duplicateTopicTitle = this.topic.title;
  }
  
  onInputChange() {
    this.isChanged = true;
  }
  
  submitEditForm() {
    this.isSubmitting = true;
    this.errorMessage = '';
    
    if (this.isChanged) {
      if (!this.topic.title) {
        this.errorMessage = 'Please, enter the topic title';
        this.isSubmitting = false;
        return false;
      } else {
        this._Topic.updateTopic(this.topic, this.topic._id)
          .then(
          (updatedTopic) => {
            this.ok(updatedTopic);
          },
          (error) => {
            this.isSubmitting = false;
            this.errorMessage = error.data.message;
            if (error.status === 422) {
              this.topic.title = this.duplicateTopicTitle;
              this.isChanged = false;
            }
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
    this.topic.title = this.duplicateTopicTitle;
    this.dismiss({$value: 'cancel'});
  }

}

let EditTopic = {
  controller: EditTopicCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/components/modals/edit-topic.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default EditTopic;
