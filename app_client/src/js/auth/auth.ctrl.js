'use strict';

/** Class representing an authentication controller. */
class AuthCtrl {
  constructor(User, $state, AppConstants) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    this.pswPattern = AppConstants.pswPattern;
    
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    
    this.errorMessage = '';
    
    this.authFormData = {};

  }

  submitForm () {
    this.isSubmitting = true;
    
    let name = this.authFormData.name || '';
    let surname = this.authFormData.surname || '';
    let email = this.authFormData.email || '';
    let password = this.authFormData.password || '';
    
    switch (this.authType) {
    case 'register':
      if (!name || !surname || !email || !password) {
        this.errorMessage = 'All fields required';
        this.authFormData.password = '';
        this.isSubmitting = false;
        return false;
      } else {
        this._doAuth();
      }
      break;
    case 'login':
      if (!email || !password) {
        this.errorMessage = 'All fields required';
        this.authFormData.password = '';
        this.isSubmitting = false;
        return false;
      } else {
        this._doAuth();
      }
      break;
    default: this.errorMessage = 'Not found';
    }
    
  }
  
  _doAuth() {
    this._User.attemptAuth(this.authType, this.authFormData)
      .then(
        (res) => {
          if (res.message) {
            this.isSubmitting = false;
            console.log(res.message);
          } else {
            this._$state.go('app.general');
          }
        }
      )
      .catch((err) => {
        this.isSubmitting = false;
        this.errorMessage = err.data.message;
        this.authFormData.password = '';
      });
  }
  
}

export default AuthCtrl;
