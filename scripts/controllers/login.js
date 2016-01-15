app.controller('LoginController', function($scope, $state, $firebaseArray, $filter, Auth, UserService) {

  // Logout user
  // Auth.$unauth();

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  }

  $scope.login = function(authMethod) {
    Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
      console.log('Logged In ' + authData.email);

      UserService.storeUserCredentials(authData);
      $state.go('home');
    }).catch(function(error) {
      console.log(error);
    });
  }

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData);

      UserService.storeUserCredentials(authData);
      $state.go('home');
    }
    // This will display the user's name in our view
    $scope.authData = authData;
  });
  
});