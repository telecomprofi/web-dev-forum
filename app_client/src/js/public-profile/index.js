'use strict';

import angular from 'angular';

// Create the public-profile module
let publicProfileModule = angular.module('app.publicProfile', []);

// Include UI-Router public-profile.config settings
import PublicProfileConfig from './public-profile.config';
publicProfileModule.config(PublicProfileConfig);

// Include controllers
import PublicProfileCtrl from './public-profile.ctrl';
publicProfileModule.controller('PublicProfileCtrl', PublicProfileCtrl);

export default publicProfileModule;