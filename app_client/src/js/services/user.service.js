export default class User {
  constructor(JWT, AppConstants, $http) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    
    this.current = null;
  }

  /**
   * Checks users for register or login.
   * If the attempt is successful, it stores the returned user object and JWT.
   * @param {String} type
   * @param {Object} credentials
   * @returns {Object}
   */
  attemptAuth(type, credentials) {
    let route = (type === 'login') ? '/login' : '/register';
    
    return this._$http({
      url: this._AppConstants.api + '/auth' + route,
      method: 'POST',
      data: credentials
    }).then(
      (res) => {
        
        console.log(res.data.token);
        console.log(res.data.user);
        
        this._JWT.save(res.data.token);
        this.current = res.data.user;

        return res;
      }
    )
  }

}
