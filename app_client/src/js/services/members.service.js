'use strict';

export default class Member {
  constructor(AppConstants, $http, JWT) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
  }
  
  /**
   * Returns authorized users.
   * @returns {Object}
   */
  getUserList () {
    return this._$http({
      url: this._AppConstants.api + '/users',
      method: 'GET',
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }

}
