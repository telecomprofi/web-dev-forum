/** Class representing an authorized users controller. */
class MembersCtrl {
  constructor(Member) {
    'ngInject';
    
    // Get list of authorized users
    Member
      .getUserList()
      .then(
        (users) => {
          this.users = users;
        }
      )
      .catch(
        (error) => {
          console.error('Unable to get users');
        }
      );

  }
  
}

export default MembersCtrl;
