'use strict';

class RemoveThreadCtrl {
  constructor(Thread) {
    'ngInject';
    
    this.title = 'Remove Thread';
    this._Thread = Thread;

  }
  
  $onInit() {
    this.thread = this.resolve.thread;
  }
  
  submitRemoveForm() {
    this.isSubmitting = true;
    this.errorMessage = '';

    this._Thread.removeThread(this.thread.topic._id, this.thread._id)
      .then(
      (removedThread) => {
        this.ok(removedThread);
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

let RemoveThread = {
  controller: RemoveThreadCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/components/modals/delete-thread.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default RemoveThread;
