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
    views: {
      '' : {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      },
      'columnSidebar@home': {
        templateUrl: 'views/sidebar.html'
      }
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  });
});