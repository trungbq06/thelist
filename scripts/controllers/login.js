app.controller('LoginController', function($scope, $state, $firebaseArray, $filter, Auth, UserService) {

  // Login by service: facebook, google, twitter
  $scope.login = function(authMethod) {
    Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
      UserService.login(authData);
      $state.go('home');
    }).catch(function(error) {
      console.log(error);
    });
  }
  
});