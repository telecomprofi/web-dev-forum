'use strict';

export default class JWT {
  constructor(AppConstants, $window) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$window = $window;
  }

  /**
   * Saves JWT in the local storage.
   * @param {String} token
   * @returns void
   */
  save(token) {
    this._$window.localStorage[this._AppConstants.jwtKey] = token;
  }

  /**
   * Gets JWT from the local storage.
   * @returns {String}
   */
  get() {
    return this._$window.localStorage[this._AppConstants.jwtKey];
  }

  /**
   * Deletes JWT from the local storage.
   * @returns void
   */
  destroy() {
    this._$window.localStorage.removeItem(this._AppConstants.jwtKey);
  }

}
