'use strict';

export default class User {
  constructor(JWT, AppConstants, $http, $state, $q, $window) {
    'ngInject';

    this._JWT = JWT;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$state = $state;
    this._$q = $q;
    this._$window = $window;
  
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
    );
  }
  
  /**
   * Logs users out.
   * @returns void
   */
  logout() {
    this.current = null;
    this._JWT.destroy();
    this._$state.go('app.general', {}, { inherit: false, location: 'replace', notify: false });
  }

  /**
   * Checks logged in users.
   * @returns promise
   */
  verifyAuth() {
    let deferred = this._$q.defer();
    let token = this._JWT.get();
    let payload;
    
    // check for JWT token
    if (!token) {
      deferred.resolve({isAuth: false, role: undefined});
      return deferred.promise;
    } else {
      payload = JSON.parse(this._$window.atob(token.split('.')[1]));
      let isExpired = payload.exp <= Date.now() / 1000;
      
      if (isExpired) {
        this._JWT.destroy();
        deferred.resolve({isAuth: false, role: undefined});
        return deferred.promise;
      }
    }
    
    if (this.current) {
      deferred.resolve({isAuth: true, role: this.current.role});
    } else {
      this._$http({
        url: this._AppConstants.api + '/users/' + payload._id,
        method: 'GET',
        headers: {
          Authorization: 'JWT ' + this._JWT.get()
        }
      }).then(
        (res) => {
          this.current = res.data.user;
          deferred.resolve({isAuth: true, role: this.current.role});
        },

        (err) => {
          this._JWT.destroy();
          deferred.resolve({isAuth: false, role: undefined});
        }
      );
      
    }

    return deferred.promise;
  }
   
  /**
   * Checks if the user is logged in.
   * @param {Boolean} hasAccess
   * @returns promise
   */
  ensureAuthIs(hasAccess) {
    let deferred = this._$q.defer();

    this.verifyAuth().then((authValid) => {
      // if it's the opposite, redirect home
      if (authValid.isAuth !== hasAccess) {
        this._$state.go('app.general');
        deferred.resolve(false);
      } else {
        deferred.resolve(true);
      }
    });

    return deferred.promise;
  }

  /**
   * Checks the role of the logged in user.
   * @returns promise
   */
  checkRole() {
    let deferred = this._$q.defer();
    
    this.verifyAuth().then((authValid) => {
      if (authValid.isAuth) {
        
        console.log('authValid.role from checkRole:', authValid.role);
        
        deferred.resolve(authValid.role);
      } else {
        deferred.resolve(authValid.role);
      }
    });
    
    return deferred.promise;
  }
  
  /**
   * Sets or removes user restrictions.
   * @param {String} userId
   * @param {Object} user
   * @returns {Object}
   */
  setUserAction(userId, user) {
    return this._$http({
      url: `${this._AppConstants.api}/users/${userId}/control`,
      method: 'PUT',
      data: user,
      headers: {
        Authorization: `JWT ${this._JWT.get()}`
      }
    }).then((res) => res.data);
  }
  
}
