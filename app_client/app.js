'use strict';

import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-ui-bootstrap';

import appConfig from './config';
import appConstants from './src/js/config/app.constants';

import './src/js/layout';
import './src/js/components';
import './src/js/services';
import './src/js/auth';
import './src/js/general';
import './src/js/members';
import './src/js/profile';
import './src/js/public-profile';
import './src/js/topic';
import './src/js/thread';
import './src/js/directives';

const requires = [
  'ui.router',
  'ui.bootstrap',
  'app.layout',
  'app.components',
  'app.services',
  'app.auth',
  'app.general',
  'app.members',
  'app.profile',
  'app.publicProfile',
  'app.topic',
  'app.thread',
  'app.directives'
];

angular.module('forumApp', requires);

angular.module('forumApp').constant('AppConstants', appConstants);

angular.module('forumApp').config(appConfig);
