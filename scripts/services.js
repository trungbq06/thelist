/**
* Auth factory from firebase to login and logout social network
*/
app.factory('Auth', function($firebaseAuth) {
  var endPoint = 'https://thetodo.firebaseio.com/';
  var usersRef = new Firebase(endPoint);

  return $firebaseAuth(usersRef);
});

/**
* UserService to store and manipulate user login and logout
*/
app.factory('UserService', function ($http, $q, $window, $localStorage) {

  // User variable
  var userid = '';
  var provider = '';
  var profileImageURL = '';
  var username = '';

  // Check if user logged in or not
  var isAuthenticated = false;

  /**
  * Load user from local storage
  */
  function loadUser() {
    var authData = $localStorage.local_user;

    if (authData) {
      login(authData);
    }
  }

  // Store user to local storage
  function storeUser(authData) {
    $localStorage.local_user = authData;

    login(authData);
  }

  /**
  * Login social network
  */
  var login = function (authData) {
    userid = authData.uid;
    provider = authData.provider;
    profileImageURL = authData.profileImageURL;

    if (provider === 'facebook') {
      username = authData.facebook.displayName;
    } else if (provider === 'google') {
      username = authData.google.displayName;
    } else if (provider === 'twitter') {
      username = authData.twitter.displayName;
    }

    isAuthenticated = true;
  }

  /**
  * Destroy all local data when user logout
  */
  function destroy() {
    userid = '';
    username = '';
    provider = '';
    isAuthenticated = false;

    $localStorage.local_user = null;
  }

  /**
  * Logout user from social network
  */
  var logout = function() {
    destroy();
  };

  /**
  * Return UserService object
  */
  return {
    logout: logout,
    login: function(authData) {
      storeUser(authData);
    },
    isAuthenticated: function() {return isAuthenticated;},
    userid: function() {return userid;},
    username: function() {return username;},
    provider: function() {return userid;},
    profileImageURL: function() {return userid;},
    loadUser: function() {loadUser();}
  };
});

app.factory('Task', function($firebaseAuth, UserService) {
  var endPoint = 'https://thetodo.firebaseio.com/tasks/' + UserService.userid();
  var taskRef = new Firebase(endPoint);

  return taskRef;
});

app.factory('TaskService', function ($firebaseArray, Task, UserService) {

  var findAll = function() {
    return $firebaseArray(Task.orderByChild('done').equalTo(false));
  }

  var findByDate = function(date) {
    return $firebaseArray(Task.orderByChild('date_done').equalTo(date + '_' + false));
  }

  return {
    findByDate: function(date) {
      return findByDate(date);
    },
    findAll: function() {
      return findAll();
    }
  }
});