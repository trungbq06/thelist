app.factory('FireAuth', function($firebaseAuth) {
  var endPoint = 'https://thetodo.firebaseio.com/';
  var usersRef = new Firebase(endPoint);

  return $firebaseAuth(usersRef);
});

app.factory('AuthService', function ($firebaseAuth, $http, $q, $window) {
  var LOCAL_USER_KEY = 'local_user';
  var username = '';
  var isAuthenticated = false;
  var role = '';
  var authToken;

  function loadUserCredentials() {
    var authData = window.localStorage.getItem(LOCAL_USER_KEY);
    if (authData) {
      useCredentials(authData);
    }
  }
 
  function storeUserCredentials(authData) {
    window.localStorage.setItem(LOCAL_USER_KEY, authData);
    useCredentials(authData);
  }

  function useCredentials(authData) {
    username = authData.email;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
    window.localStorage.removeItem(LOCAL_USER_KEY);
  }

  var logout = function() {
    destroyUserCredentials();
  };
 
  var isAuthorized = function(authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  };
 
  loadUserCredentials();

  return {
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
});