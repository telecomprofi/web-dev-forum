'use strict';

import angular from 'angular';

// Create the members module
let membersModule = angular.module('app.members', []);

// Include UI-Router members.config settings
import MembersConfig from './members.config';
membersModule.config(MembersConfig);

// Include controllers
import MembersCtrl from './members.ctrl';
membersModule.controller('MembersCtrl', MembersCtrl);

export default membersModule;