
var app = angular.module('listApp', ['ui.bootstrap', 'firebase', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    // Route for home page
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })

    // Route for about page
    .when ('/about', {
      templateUrl: 'views/about.html',
      controller: 'aboutController'
    })
});

app.controller('aboutController', function($scope, $firebaseObject) {
  $scope.message = 'About Page! There\'s something very special about AngularJS !';
});