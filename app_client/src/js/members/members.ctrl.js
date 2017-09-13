'use strict';

/** Class representing an authorized users controller. */
class MembersCtrl {
  constructor(role, Member, User, $state, AppConstants) {
    'ngInject';
    
    this.title = $state.current.title;
    this._$state = $state;
    this.role = role;
    this._User = User;
    
    // Get list of authorized users
    if (this.role === AppConstants.roleAdmin) {
      Member
      .getUserList()
      .then(
        (users) => {   
          this.users = users.filter(user => (user.role !== AppConstants.roleAdmin));
          if (this.users.length === 0) {
            this.errorMessage = 'The list of members is empty.';
          }
        }
      )
      .catch(
        (error) => {
          this.errorMessage = error.data.message;
        }
      );
    } else {
      this.errorMessage = 'You do not have permission to view the list of members';
    }

  }

  /**
   * Sets user action.
   * @returns void
   */
  controlUserActions(user) {
    this._User.setUserAction(user._id, user)
    .then(
      (user) => {},
      (error) => {
        this.errorMessage = error.data.message;
      }
    );
  }
  
}

export default MembersCtrl;
