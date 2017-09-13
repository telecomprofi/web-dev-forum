'use strict';

class RemoveTopicCtrl {
  constructor(Topic) {
    'ngInject';
    
    this.title = 'Remove Topic';
    this._Topic = Topic;

  }
  
  $onInit() {
    this.topic = this.resolve.topic;
  }
  
  submitRemoveForm() {
    this.isSubmitting = true;
    this.errorMessage = '';

    this._Topic.removeTopic(this.topic._id)
      .then(
      (removedTopic) => {  
        this.ok(removedTopic);
      },
      (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.data.message;
      }
    );

    return false;
    
  }

  ok(data) {
    this.close({$value: data});
  }
  
  cancel() {
    this.dismiss({$value: 'cancel'});
  }

}

let RemoveTopic = {
  controller: RemoveTopicCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/components/modals/remove-topic.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default RemoveTopic;
