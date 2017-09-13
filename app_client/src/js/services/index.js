'use strict';

import angular from 'angular';

// Create the services module
let servicesModule = angular.module('app.services', []);

import JWTService from './jwt.service';
servicesModule.service('JWT', JWTService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import MembersService from './members.service';
servicesModule.service('Member', MembersService);

import TopicService from './topic.service';
servicesModule.service('Topic', TopicService);

import ThreadService from './thread.service';
servicesModule.service('Thread', ThreadService);

import AnswerService from './answer.service';
servicesModule.service('Answer', AnswerService);

export default servicesModule;
