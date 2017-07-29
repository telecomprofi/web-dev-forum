
import angular from 'angular';
import '@uirouter/angularjs';

//import {$, jQuery} from 'jquery';
//// export for others scripts to use
//window.$ = $;
//window.jQuery = jQuery;


import appConfig from './config';
import appConstants from './src/js/config/app.constants';

import './src/js/layout';
import './src/js/services';
import './src/js/auth';
import './src/js/members';

const requires = [
  'ui.router',
  'app.layout',
  'app.services',
  'app.auth',
  'app.members'
];

//window.app = angular.module('forumApp', requires);
angular.module('forumApp', requires);

angular.module('forumApp').constant('AppConstants', appConstants);

angular.module('forumApp').config(appConfig);
