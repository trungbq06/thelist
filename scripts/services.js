app.factory('Auth', function($firebaseAuth) {
  var endPoint = 'https://thetodo.firebaseio.com/';
  var usersRef = new Firebase(endPoint);

  return $firebaseAuth(usersRef);
});

app.factory('UserService', function ($firebaseAuth, $http, $q, $window) {
  var LOCAL_USER_KEY = 'local_user';
  var userid = '';
  var provider = '';
  var profileImageURL = '';
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

  var useCredentials = function (authData) {
    userid = authData.uid;
    provider = authData.provider;
    profileImageURL = authData.profileImageURL;

    isAuthenticated = true;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    userid = '';
    provider = '';
    isAuthenticated = false;
    window.localStorage.removeItem(LOCAL_USER_KEY);
  }

  var logout = function() {
    destroyUserCredentials();
  };
 
  loadUserCredentials();

  return {
    logout: logout,
    storeUserCredentials: function(authData) {
      storeUserCredentials(authData);
    },
    isAuthenticated: function() {return isAuthenticated;},
    userid: function() {return userid;},
    provider: function() {return userid;},
    profileImageURL: function() {return userid;},
    role: function() {return role;}
  };
});