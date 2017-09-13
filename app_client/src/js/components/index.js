import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import AdminThreadControls from './buttons/admin-thread-controls.component';
componentsModule.component('adminThreadControls', AdminThreadControls);

import ThreadControls from './buttons/thread-controls.component';
componentsModule.component('threadControls', ThreadControls);

import PostControls from './buttons/post-controls.component';
componentsModule.component('postControls', PostControls);

import warningMessage from './messages/warning-message.component';
componentsModule.component('warningMessage', warningMessage);

import GuideToAction from './messages/guide-to-action.component';
componentsModule.component('guideToAction', GuideToAction);

import TopicItem from './topic-item.component';
componentsModule.component('topicItem', TopicItem);

import PostItem from './post-item.component';
componentsModule.component('postItem', PostItem);

import ShowError from './modals/show-error.component';
componentsModule.component('showError', ShowError);

import EditTopic from './modals/edit-topic.component';
componentsModule.component('editTopic', EditTopic);

import RemoveTopic from './modals/remove-topic.component';
componentsModule.component('removeTopic', RemoveTopic);

import EditThread from './modals/edit-thread.component';
componentsModule.component('editThread', EditThread);

import RemoveThread from './modals/delete-thread.component';
componentsModule.component('deleteThread', RemoveThread);

export default componentsModule;
