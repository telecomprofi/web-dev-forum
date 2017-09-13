'use strict';

import angular from 'angular';

// Create the general module
let generalModule = angular.module('app.general', []);

// Include UI-Router general.config settings
import GeneralConfig from './general.config';
generalModule.config(GeneralConfig);

// Include controllers
import GeneralCtrl from './general.ctrl';
generalModule.controller('GeneralCtrl', GeneralCtrl);

// Components
import AddTopic from './add-topic.component';
generalModule.component('addTopic', AddTopic);

export default generalModule;