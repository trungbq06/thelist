app.run(function ($rootScope, $state, Auth, UserService) {

  // Load user from local storage
  UserService.loadUser();

  // Trigger when state change start
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (!UserService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
    
  });
});