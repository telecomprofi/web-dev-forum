import angular from 'angular';

// Create the services module
let servicesModule = angular.module('app.services', []);

import JWTService from './jwt.service';
servicesModule.service('JWT', JWTService);

import UserService from './user.service';
servicesModule.service('User', UserService);

import MembersService from './members.service';
servicesModule.service('Member', MembersService);

export default servicesModule;
