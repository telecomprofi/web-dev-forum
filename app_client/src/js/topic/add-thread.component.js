'use strict';

class AddThreadCtrl {
  constructor(Thread) {
    'ngInject';
    
    this.title = 'Add Thread';
    this._Thread = Thread;
    
    this.thread = {
      title: '',
      description: ''
    };
  }
  
  $onInit() {
    this.topicId = this.resolve.topicId;
  }
   
  submitThreadForm() {
    this.isSubmitting = true;
    this.errorMessage = '';
    
    this.thread.title = this.threadTitle;
    this.thread.description = this.threadDescription;
    
    if (!this.thread.title || !this.threadDescription) {
      this.errorMessage = 'Please, fill in all the fields';
      this.isSubmitting = false;
      return false;
    } else {
      this._Thread.saveThread(this.thread, this.topicId)
        .then(
        (newThread) => {
          this.ok(newThread);
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

let AddThread = {
  controller: AddThreadCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/topic/add-thread.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default AddThread;
