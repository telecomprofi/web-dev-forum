export default class Member {
  constructor(AppConstants, $http) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }
  
  /**
   * Returns authorized users.
   * @returns {Object}
   */
  getUserList () {
    return this._$http({
      url: this._AppConstants.api + '/users',
      method: 'GET',
    }).then((res) => res.data);
  }

}
