'use strict';

class AddAnswerCtrl {
  constructor(Answer, $scope) {
    'ngInject';
    
    this.title = 'Post Answer';
    this._Answer = Answer;
    this._$scope = $scope;
    
    this.answer = {
      responseText: ''
    };
    
    this.responseText = '';
    this.isChanged = false;
  }

  $onInit() {
    // Inserts the quote to the answer field.
    this._$scope.$on('addQuote', (event, quote) => {
      this.responseText = this.responseText + quote;
      this.isChanged = true;
    });
  }
  
  /**
   * Checks if the answer was changed.
   * @returns void
   */ 
  onInputChange() {
    this.isChanged = true;
  }
  
  /**
   * Creates a new answer.
   * @returns void
   */
  submitAnswerForm() {
    this.isSubmitting = true;
    this.errorMessage = '';
    
    this.answer.responseText = this.responseText;
    
    if (this.isChanged) {
      if (!this.answer.responseText) {
        this.errorMessage = 'Please type in your answer';
        this.isSubmitting = false;
        return false;
      } else { 
        this._Answer.saveAnswer(this.answer, this.thread._id)
        .then(
        (newAnswer) => {
          this.reloadPage();
        },
        (error) => {
          this.isSubmitting = false;
          this.errorMessage = error.data.message;
          this.isChanged = false;
        }
      );

      return false;
      }
    } else {
      this.isSubmitting = false;
    }
  }

  /**
   * Reloads the page.
   * @returns void
   */
  reloadPage() {
    this.onReload();
  }
}

let AddAnswer = {
  controller: AddAnswerCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/thread/add-answer.html',
  bindings: {
    thread: '=',
    onReload: '&'
  }
};

export default AddAnswer;
