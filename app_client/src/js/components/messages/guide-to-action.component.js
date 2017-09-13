'use strict';

class GuideToActionCtrl {
  constructor() {
    'ngInject';
    
  }

}

let GuideToAction = {
  controller: GuideToActionCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/components/messages/guide-to-action.html',
  bindings: {
    text: '@'
  }
};

export default GuideToAction;
