'use strict';

/** Class representing user profile controller. */
class ProfileCtrl {
  constructor(role, profile, Profile, $state, AppConstants) {
    'ngInject';
    
    this.title = $state.current.title;
    this.role = role;
    this.profile = profile;
    this._$state = $state;
    
    this._Profile = Profile;
 
    this.pswPattern = AppConstants.pswPattern;
    
    this.resetProfileForm();
    
    this.isUserBanned = this.profile.user.banned;
    this.isChanged = false;
    
  }
  
  /**
   * Reloads the profile page.
   * @returns void
   */
  reload() {
    this._$state.go(this._$state.current, {}, {reload: true });
  }
  
  onInputChange() {
    this.isChanged = true;
  }
  
  submitProfileForm() {
    this.isSubmitting = true;
    this.errorMessage = '';

    if (this.isChanged) {
      if (!this.profileFormData.name || !this.profileFormData.surname) {
        this.errorMessage = 'Name or surname can not be empty.';
        this.isSubmitting = false;
        return false;
      } else {
        this._Profile.updateProfile(this.profile.user._id, this.profileFormData)
          .then(
          (updatedProfile) => {
            this.reload();
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
  
  resetProfileForm(form) {
    if (form) {
      form.$setPristine();
      form.$setUntouched();
    }
    
    let userName = this.profile.user.name,
        userSurname = this.profile.user.surname,
        userEmail = this.profile.user.email,
        userPassword = '',
        userCreatedAt = this.profile.user.createdAt,
        userNickname = this.profile.nickname,
        userBio = this.profile.bio,
        userLocation = this.profile.location;
    
    this.profileFormData = {
      name: userName,
      surname: userSurname,
      email: userEmail,
      password: userPassword,
      createdAt: userCreatedAt,
      nickname: userNickname,
      bio: userBio,
      location: userLocation
    };
  }
  
}

export default ProfileCtrl;