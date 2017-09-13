'use strict';

import angular from 'angular';

// Create the topic module
let topicModule = angular.module('app.topic', []);

// Include UI-Router topic.config settings
import TopicConfig from './topic.config';
topicModule.config(TopicConfig);

// Include controllers
import TopicCtrl from './topic.ctrl';
topicModule.controller('TopicCtrl', TopicCtrl);

// Components
import AddThread from './add-thread.component';
topicModule.component('addThread', AddThread);

export default topicModule;
