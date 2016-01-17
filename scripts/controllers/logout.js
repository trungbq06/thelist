app.controller('LogoutController', function($scope, $state, $firebaseArray, $filter, Auth, UserService) {

  // Logout current user
  Auth.$unauth();
  UserService.logout();

  // Redirect to login
  $state.go('login');

});