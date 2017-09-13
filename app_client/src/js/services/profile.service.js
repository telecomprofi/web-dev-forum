'use strict';

export default class Profile {
  constructor(AppConstants, $http, JWT) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
  }
  
  /**
   * Retrieves the profile for the user.
   * @param {String} userId
   * @returns {Object}
   */
  getProfile(userId) {
    return this._$http({
      url: `${this._AppConstants.api}/profiles/${userId}`,
      method: 'GET',
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }

  /**
   * Retrieves the user profile for public.
   * @param {String} userId
   * @returns {Object}
   */
  getPublicProfile(userId) {
    return this._$http({
      url: `${this._AppConstants.api}/profiles/${userId}/public`,
      method: 'GET'
    }).then((res) => res.data);
  }
  
  /**
   * Updates the user with his profile.
   * @param {Object} user
   * @param {String} userId
   * @returns {Object}
   */
  updateProfile(userId, user) {
    return this._$http({
      url: `${this._AppConstants.api}/profiles/${userId}`,
      method: 'PUT',
      data: user,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
}
