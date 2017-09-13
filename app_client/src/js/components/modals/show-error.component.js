'use strict';

class ShowErrorCtrl {
  constructor() {
    'ngInject';
    
  }
  
  $onInit() {
    this.errorMessage = this.resolve.errorMessage;
  }

  ok() {
    this.close();
  }
  
  cancel() {
    this.dismiss({$value: 'cancel'});
  }

}

let ShowError = {
  controller: ShowErrorCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/components/modals/show-error.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  }
};

export default ShowError;
