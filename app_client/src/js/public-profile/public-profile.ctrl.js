'use strict';

/** Class representing public profile controller. */
class PublicProfileCtrl {
  constructor(role, profile, AppConstants) {
    'ngInject';
    
    this.role = role;
    
    if (this.role === AppConstants.roleAdmin) {
      this.isAdmin = true;
    }
    
    this.profile = profile;

    this.title = this.profile.nickname || this.profile.name;

    this.isUserBanned = this.profile.banned;
    
  }
  
}

export default PublicProfileCtrl;