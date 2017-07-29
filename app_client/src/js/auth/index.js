import angular from 'angular';

// Create the auth module
let authModule = angular.module('app.auth', []);

// Include UI-Router auth.config settings
import AuthConfig from './auth.config';
authModule.config(AuthConfig);

// Include controllers
import AuthCtrl from './auth.ctrl';
authModule.controller('AuthCtrl', AuthCtrl);

export default authModule;
