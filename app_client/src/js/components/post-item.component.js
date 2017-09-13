'use strict';

class PostItemCtrl {
  constructor(Thread, $uibModal, $state, $sce) {
    'ngInject';

    this._Thread = Thread;
    this._$uibModal = $uibModal;
    this._$state = $state;
    this._$sce = $sce;
    
    // Renders the answer content as HTML
    this.text = $sce.trustAsHtml(this.answer.responseText);
    
  }

  /**
   * Checks if the user can edit the answer.
   * @param {Object} answer
   * @returns void
   */
  checkAnswerEditing(answer) {
    this.onGetCertainAnswer({answer: answer});
  }

  /**
   * Checks if the user can like the answer.
   * @param {Object} answer
   * @returns void
   */
  addLike(answer) {
    this.onLikeAnswer({answer: answer});
  }
  
  /**
   * Checks if the user can like the answer.
   * @param {Object} answer
   * @returns void
   */
  addDislike(answer) {
    this.onDislikeAnswer({answer: answer});
  }

  /**
   * Checks if the user can like the answer.
   * @param {String} responseText
   * @returns void
   */
  quoteAnswer(responseText) {
    this.onInsertQuote({quote: responseText});
  }
  
  /**
   * Checks if the answer can be the best answer.
   * @param {Object} answer
   * @returns void
   */
  checkChooseBestAnswer(answer) {
    this.onChooseBestAnswer({answer: answer});
  }
  
  /**
   * Reloads the page.
   * @returns void
   */
  reloadPage() {
    this.onReload();
  }
}

let PostItem = {
  bindings: {
    thread: '=',
    hasBestAnswer: '<',
    role: '<',
    isThreadAuthor: '<',
    answer: '=',
    onGetCertainAnswer: '&',
    onLikeAnswer: '&',
    onDislikeAnswer: '&',
    onInsertQuote: '&',
    onChooseBestAnswer: '&',
    onReload: '&'
  },
  controller: PostItemCtrl,
  templateUrl: 'src/js/components/post-item.html'
};

export default PostItem;
