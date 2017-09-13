'use strict';

export default class Topic {
  constructor(AppConstants, $http, JWT) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
  }
 
  /**
   * Returns topics.
   * @returns {Object}
   */
  getTopicList() {
    return this._$http({
      url: this._AppConstants.api + '/topics',
      method: 'GET'
    }).then((res) => res.data);
  }
  
  /**
   * Returns titles of topics.
   * @returns {Object}
   */
  getTopicsTitles() {
    return this._$http({
      url: this._AppConstants.api + '/topics/titles',
      method: 'GET'
    }).then((res) => res.data);
  }
  
  /**
   * Saves a new topic.
   * @param {Object} topic
   * @returns promise
   */
  saveTopic(topic) {
    return this._$http({
      url: this._AppConstants.api + '/topics',
      method: 'POST',
      data: topic,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
  /**
   * Retrieves a single topic.
   * @param {String} topicId
   * @returns {Object}
   */
  getTopic(topicId) {
    return this._$http({
      url: this._AppConstants.api + '/topics/' + topicId,
      method: 'GET'
    }).then((res) => res.data);
  }
  
  /**
   * Updates a single topic.
   * @param {Object} topic
   * @param {String} topicId
   * @returns {Object}
   */
  updateTopic(topic, topicId) {
    return this._$http({
      url: this._AppConstants.api + '/topics/' + topicId,
      method: 'PUT',
      data: topic,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
  /**
   * Removes a single topic.
   * @param {String} topicId
   * @returns {Object}
   */
  removeTopic(topicId) {
    return this._$http({
      url: this._AppConstants.api + '/topics/' + topicId,
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
}
