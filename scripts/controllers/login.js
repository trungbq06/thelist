app.controller('LoginController', function($scope, $window, $state, $firebaseArray, $filter, Auth, Task, UserService) {

  // Login by service: facebook, google, twitter
  $scope.login = function(authMethod) {
    Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
      UserService.login(authData);

      Task.setEndPoint();
      $state.go('home');
    }).catch(function(error) {
      console.log(error);
    });
  }
  
});