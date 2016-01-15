app.controller('LogoutController', function($scope, $state, $firebaseArray, $filter, Auth, UserService) {

  console.log('Logging out');
  Auth.$unauth();

  $state.go('login');

});