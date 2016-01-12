app.controller('LoginController', function($scope, $firebaseArray, $filter, FireAuth, AuthService, AUTH_EVENTS) {

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  }

  $scope.facebook_login = function() {
    FireAuth.$authWithOAuthRedirect(authMethod).then(function(authData) {
    }).catch(function(error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        Auth.$authWithOAuthPopup(authMethod).then(function(authData) {
        });
      } else {
        console.log(error);
      }
    });
  }
  
});