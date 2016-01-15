var app = angular.module('listApp', ['firebase', 'ui.router', 'ngRoute', 'ui.bootstrap']);

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
      'columnSidebar': {
        templateUrl: 'views/sidebar.html'
      },
      'userProfile': {
        templateUrl: 'views/user_profile.html'
      }
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html',
    controller: 'LoginController'
  })
  .state('logout', {
    url: '/logout',
    controller: 'LogoutController'
  })
});