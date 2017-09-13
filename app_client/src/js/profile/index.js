'use strict';

import angular from 'angular';

// Create the profile module
let profileModule = angular.module('app.profile', []);

// Include UI-Router profile.config settings
import ProfileConfig from './profile.config';
profileModule.config(ProfileConfig);

// Include controllers
import ProfileCtrl from './profile.ctrl';
profileModule.controller('ProfileCtrl', ProfileCtrl);

export default profileModule;