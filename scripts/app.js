var app = angular.module('listApp', ['firebase', 'ui.router', 'ngRoute', 'ui.bootstrap']);

app.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth_not_authenticated',
  notAuthorized: 'auth_not_authorized'
});

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'views/main.html',
    controller: 'MainController'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  });
});

app.controller('aboutController', function($scope, $firebaseObject) {
  $scope.message = 'About Page! There\'s something very special about AngularJS !';
});

app.factory('AuthService', function ($http, $q, $window) {
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
 
  var login = function() {
    return $q(function(resolve, reject) {
      if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
        // Make a request and receive your auth token from your server
        storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }
    });
  };
 
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
    login: login,
    logout: logout,
    isAuthorized: isAuthorized,
    isAuthenticated: function() {return isAuthenticated;},
    username: function() {return username;},
    role: function() {return role;}
  };
});

app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
 
    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }
 
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});