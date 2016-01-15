app.run(function ($rootScope, $state, UserService) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

    if (!UserService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});