'use strict';

class AppHeaderCtrl {
  constructor(User, $scope) {
    'ngInject';

    this.currentUser = User.current;

    $scope.$watch('User.current', (newUser) => {
      this.currentUser = newUser;
    });
    
    this.logout = User.logout.bind(User);
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  controllerAs: '$ctrl',
  templateUrl: 'src/js/layout/header.html'
};

export default AppHeader;
