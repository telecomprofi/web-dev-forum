'use strict';

/** Class representing a controller of home page. */
class ThreadCtrl {
  constructor(role, thread, User, Thread, Answer, AppConstants, $uibModal, $state, $stateParams, $scope) {
    'ngInject';

    this.role = role;
    this.thread = thread;
    this._Thread = Thread;
    this._Answer = Answer;
    this._$uibModal = $uibModal;
    this._$scope = $scope;
    this._$stateParams = $stateParams;
    
    if (!this.thread) {
      this.errorMessage = 'No thread yet.';
    } else {
      this.errorMessage = '';
      this.hasBestAnswer = this.thread.answers.some( answer => answer.isUseful );
    }
    
    if (User.current && this.role) {
      this.isAdmin = (User.current.role === AppConstants.roleAdmin);
      this.isUser = (User.current.role === AppConstants.roleUser);
      this.isUserBanned = User.current.banned;
      this.isThreadAuthor = (User.current.email === this.thread.author.email);
    } else {
      this.isAdmin = false;
      this.isUser = false;
      this.isUserBanned = false;
      this.isThreadAuthor = false;
    }
    
    this._$state = $state;
    this.currentState = $state.current.name.replace('app.', '');
    
    this.isEditable = false;

  }

  /**
   * Gets the quote and generates an event about it.
   * @returns void
   */
  insertQuote(quote) {
    this.quote = `<blockquote>${quote}</blockquote>`;
    this._$scope.$broadcast('addQuote', this.quote);
  }
  
  /**
   * Reloads the thread page.
   * @returns void
   */
  reload() {
    this._$state.go(this._$state.current, {}, {reload: true });
  }

  /**
   * Shows the modal.
   * @returns void
   */
  showErrorMessage(errorMessage) {
    this.openShowError(errorMessage);
  }
  
  /**
   * Opens a modal for showing the error.
   * @returns void
   */
  openShowError(errorMessage) {
    
    let modalInstance = this._$uibModal.open({
      component: 'showError',
      resolve: {
        errorMessage: function () {
          return errorMessage;
        }
      }
    });

    modalInstance.result.then(() => {
      this.errorMessage = '';
      this.isModalMessage = false;
    });
  }
  
//=========================================
// Actions with Thread
//=========================================
  /**
   * Sets a like to the thread.
   * @returns void
   */
  likeThread() {
    let mark = 'like';
    
    this._Thread.setMarkForThread(this._$stateParams.topicId, this.thread._id, mark)
    .then(
      (thread) => { 
        this.reload();
      },
      (error) => {
        this.isModalMessage = true;
        this.errorMessage = error.data.message;
        this.showErrorMessage(this.errorMessage);
      }
    );
  }

  /**
   * Sets a dislike to the thread.
   * @returns void
   */
  dislikeThread() {
    let mark = 'dislike';
    
    this._Thread.setMarkForThread(this._$stateParams.topicId, this.thread._id, mark)
    .then(
      (thread) => {
        this.reload();
      },
      (error) => {
        this.isModalMessage = true;
        this.errorMessage = error.data.message;
        this.showErrorMessage(this.errorMessage);
      }
    );
  }
  
//=========================================
// Actions with Answer
//=========================================
  /**
   * Gets the answer.
   * @returns void
   */
  getCertainAnswer(answer) {
    this.responseText = '';
    this.answerId = undefined;
    
    this._Answer.getAnswer(this.thread._id, answer._id)
    .then(
      (answer) => {
        this.responseText = answer.responseText;
        this.answerId = answer._id;
        this.isEditable = true;
      },
      (error) => {
        this.isModalMessage = true;
        this.errorMessage = error.data.message;
        this.showErrorMessage(this.errorMessage);
      }
    );
  }
  
  /**
   * Sets a like to the answer.
   * @returns void
   */
  likeAnswer(answer) {
    let mark = 'like';
    
    this._Answer.setMarkForAnswer(this.thread._id, answer._id, mark)
    .then(
      (answer) => { 
        this.reload();
      },
      (error) => {
        this.isModalMessage = true;
        this.errorMessage = error.data.message;
        this.showErrorMessage(this.errorMessage);
      }
    );
    
  }

  /**
   * Sets a dislike to the answer.
   * @returns void
   */
  dislikeAnswer(answer) {
    let mark = 'dislike';
    
    this._Answer.setMarkForAnswer(this.thread._id, answer._id, mark)
    .then(
      (answer) => {
        this.reload();
      },
      (error) => {
        this.isModalMessage = true;
        this.errorMessage = error.data.message;
        this.showErrorMessage(this.errorMessage);
      }
    );
    
  }

  /**
   * Chooses the best answer.
   * @returns void
   */
  chooseBestAnswer(answer) {
    this._Answer.setBestAnswer(this.thread._id, answer._id, answer)
    .then(
      (answer) => {
        this.reload();
      },
      (error) => {
        this.isModalMessage = true;
        this.errorMessage = error.data.message;
        this.showErrorMessage(this.errorMessage);
      }
    );
  }
  
}

export default ThreadCtrl;
