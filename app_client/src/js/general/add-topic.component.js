'use strict';

class AddTopicCtrl {
  constructor(Topic) {
    'ngInject';
    
    this.title = 'Add Topic';
    this._Topic = Topic;
    
    this.topic = {
      title: ''
    };
  }
    
  submitTopicForm() {
    this.isSubmitting = true;
    this.errorMessage = '';
    
    this.topic.title = this.topicTitle;
    
    if (!this.topic.title) {
      this.errorMessage = 'Please, enter the topic title';
      this.isSubmitting = false;
      return false;
    } else {
      this._Topic.saveTopic(this.topic)
        .then(
        (newTopic) => {
          this.ok(newTopic);
        },
        (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.data.message;
        }
      );

      return false;
    }
  }

  ok(data) {
    this.close({$value: data});
  }
  
  cancel() {
    this.dismiss({$value: 'cancel'});
  }

}

let AddTopic = {
  controller: AddTopicCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/general/add-topic.html',
  bindings: {
    close: '&',
    dismiss: '&'
  }
};

export default AddTopic;
