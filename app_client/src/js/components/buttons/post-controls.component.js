'use strict';

class PostControlsCtrl {
  constructor(User, AppConstants) {
    'ngInject';
  
    if (User.current && this.role) {
      this.isAdmin = (User.current.role === AppConstants.roleAdmin);
      this.isUser = (User.current.role === AppConstants.roleUser);
      this.isAnswerAuthor = (User.current.email === this.answer.author.email);
    } else {
      this.isAdmin = false;
      this.isUser = false;
      this.isAnswerAuthor = false;
    }
    
    if (!this.isAdmin) {
      if (!this.isUser) {
        this.isGuest = true;
      } else {
        if (User.current.banned === true) {
          this.isGuest = true;
        } else {
          this.isGuest = false;
        }
      }
    } else {
      this.isGuest = false;
    }
    
    this.sameAuthor = this.thread.author.email === this.answer.author.email;
    
    this.showSign = false;
    
    if (this.answer.isUseful && this.hasBestAnswer) {
      this.showSign = true;
    }
    
    if (this.isThreadAuthor && !this.sameAuthor && !this.answer.isUseful && !this.hasBestAnswer) {
      this.showSign = true;
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

let PostControls = {
  bindings: {
    thread: '=',
    role: '<',
    isThreadAuthor: '<',
    answer: '=',
    hasBestAnswer: '<',
    onCheckAnswerEditing: '&',
    onAddLike: '&',
    onAddDislike: '&',
    onQuoteAnswer: '&',
    onCheckChooseBestAnswer: '&',
    onReload: '&'
  },
  controller: PostControlsCtrl,
  templateUrl: 'src/js/components/buttons/post-controls.html'
};

export default PostControls;
