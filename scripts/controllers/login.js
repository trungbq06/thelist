app.controller('LoginController', function($scope, $firebaseArray, $filter, Auth, UserService, AUTH_EVENTS) {

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  }

  $scope.facebook_login = function() {
    Auth.$authWithOAuthRedirect('facebook').then(function(authData) {
      console.log('Logged In ' + authData.uid);
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup('facebook').then(function(authData) {
          console.log('Logged In ' + authData.uid);
        });
      } else {
        console.log(error);
      }
    });
  }

  Auth.$onAuth(function(authData) {
    if (authData === null) {
      console.log('Not logged in yet');
    } else {
      console.log('Logged in as', authData.uid);
    }
    // This will display the user's name in our view
    $scope.authData = authData;
  });
  
});