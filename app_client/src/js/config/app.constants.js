'use strict';

const AppConstants = {
  api: 'http://localhost:3000/api',
  appName: 'Web-Development Forum',
  jwtKey: 'jwtToken',
  roleAdmin: 'Admin',
  roleUser: 'User',
  pswPattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
};

export default AppConstants;
