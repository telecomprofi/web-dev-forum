/** Class representing an authentication controller. */
class AuthCtrl {
  constructor(User, $state) {
    'ngInject';

    this._User = User;
    this._$state = $state;
    
    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');

  }

  
  submitForm () {
    this._User.attemptAuth(this.authType, this.authFormData).then(
      (res) => {
        if (res.message) {
          console.log(res.message);
        } else {
          this._$state.go('app.general');
        }
      },
      (err) => {
        console.log(err);
//        console.log(err.data.message);
//        this.error = err.data.message;
      }
    )
  }
  
}

export default AuthCtrl;
