'use strict';

export default class Thread {
  constructor(AppConstants, $http, JWT) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
  }
  
  /**
   * Saves a new thread.
   * @param {Object} thread
   * @param {String} topicId
   * @returns promise
   */
  saveThread(thread, topicId) {
    return this._$http({
      url: `${this._AppConstants.api}/topic/${topicId}/threads`,
      method: 'POST',
      data: thread,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
  /**
   * Retrieves a single thread.
   * @param {String} topicId
   * @param {String} threadId
   * @returns {Object}
   */
  getThread(topicId, threadId) {
    return this._$http({
      url: `${this._AppConstants.api}/topic/${topicId}/threads/${threadId}`,
      method: 'GET'
    }).then((res) => res.data);
  }
  
  /**
   * Updates a single thread.
   * @param {String} topicId
   * @param {String} threadId
   * @param {Object} thread
   * @returns {Object}
   */
  updateThread(topicId, threadId, thread) {
    return this._$http({
      url: `${this._AppConstants.api}/topic/${topicId}/threads/${threadId}`,
      method: 'PUT',
      data: thread,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
  /**
   * Removes a single thread.
   * @param {String} topicId
   * @param {String} threadId
   * @returns {Object}
   */
  removeThread(topicId, threadId) {
    return this._$http({
      url: `${this._AppConstants.api}/topic/${topicId}/threads/${threadId}`,
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }

  /**
   * Updates a single thread with like or dislike.
   * @param {String} topicId
   * @param {String} threadId
   * @param {String} mark
   * @returns {Object}
   */
  setMarkForThread(topicId, threadId, mark) {
    return this._$http({
      url: `${this._AppConstants.api}/topic/${topicId}/threads/${threadId}/mark`,
      method: 'PUT',
      data: {
        mark: mark
      },
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
}
