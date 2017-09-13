'use strict';

export default class Answer {
  constructor(AppConstants, $http, JWT) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
  }
  
  /**
   * Saves a new answer.
   * @param {Object} answer
   * @param {String} topicId
   * @returns promise
   */
  saveAnswer(answer, threadId) {
    return this._$http({
      url: `${this._AppConstants.api}/threads/${threadId}/answers`,
      method: 'POST',
      data: answer,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
  /**
   * Retrieves a single answer.
   * @param {String} threadId
   * @param {String} answerId
   * @returns {Object}
   */
  getAnswer(threadId, answerId) {
    return this._$http({
      url: `${this._AppConstants.api}/threads/${threadId}/answers/${answerId}`,
      method: 'GET',
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
  /**
   * Updates a single answer.
   * @param {String} threadId
   * @param {String} answerId
   * @param {Object} answer
   * @returns {Object}
   */
  updateAnswer(threadId, answerId, answer) {
    return this._$http({
      url: `${this._AppConstants.api}/threads/${threadId}/answers/${answerId}`,
      method: 'PUT',
      data: answer,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }

  /**
   * Updates a single answer with like or dislike.
   * @param {String} threadId
   * @param {String} answerId
   * @param {String} mark
   * @returns {Object}
   */
  setMarkForAnswer(threadId, answerId, mark) {
    return this._$http({
      url: `${this._AppConstants.api}/threads/${threadId}/answers/${answerId}/mark`,
      method: 'PUT',
      data: {
        mark: mark
      },
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }

  /**
   * Updates a single answer with an utility.
   * @param {String} threadId
   * @param {String} answerId
   * @returns {Object}
   */
  setBestAnswer(threadId, answerId, answer) {
    return this._$http({
      url: `${this._AppConstants.api}/threads/${threadId}/answers/${answerId}/useful`,
      method: 'PUT',
      data: answer,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
}
