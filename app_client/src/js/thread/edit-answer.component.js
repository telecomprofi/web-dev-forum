'use strict';

class EditAnswerCtrl {
  constructor(Answer, $scope) {
    'ngInject';
    
    this._$scope = $scope;
    
    this.title = 'Update Answer';
    this._Answer = Answer;
    
    this.answer = {
      responseText: this.responseText
    };
    
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
   * Updates the answer.
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
        if (this.answerId) {
          this._Answer.updateAnswer(this.thread._id, this.answerId, this.answer)
          .then(
            (updatedAnswer) => {
              this.reloadPage();
            },
            (error) => {
              this.isSubmitting = false;
              this.errorMessage = error.data.message;
              this.isChanged = false;
            }
          );
        } else {
          this.isSubmitting = false;
          this.errorMessage = 'Answer not found';
        }

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

let EditAnswer = {
  controller: EditAnswerCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/thread/add-answer.html',
  bindings: {
    thread: '=',
    responseText: '=',
    answerId: '<',
    onReload: '&'
  }
};

export default EditAnswer;
