import angular from 'angular';

// Create the layout module
let layoutModule = angular.module('app.layout', []);


// Components
import AppHeader from './header.component';
layoutModule.component('appHeader', AppHeader);

import AppJumbotron from './jumbotron.component';
layoutModule.component('appJumbotron', AppJumbotron);


export default layoutModule;
