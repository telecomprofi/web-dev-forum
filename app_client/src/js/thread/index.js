'use strict';

import angular from 'angular';

// Create the thread module
let threadModule = angular.module('app.thread', []);

// Include UI-Router thread.config settings
import ThreadConfig from './thread.config';
threadModule.config(ThreadConfig);

// Include controllers
import ThreadCtrl from './thread.ctrl';
threadModule.controller('ThreadCtrl', ThreadCtrl);

// Components
import AddAnswer from './add-answer.component';
threadModule.component('addAnswer', AddAnswer);

import EditAnswer from './edit-answer.component';
threadModule.component('editAnswer', EditAnswer);

export default threadModule;
