app.controller('MainController', function($scope, $firebaseArray, $filter, AuthService, AUTH_EVENTS) {
	// Datepicker init
	$scope.minDate = new Date();
	$scope.loginInfo = null;

  var ref = new Firebase("https://thetodo.firebaseio.com/tasks");

  // download the data into a local object
  $scope.tasks = $firebaseArray(ref);

	$scope.username = AuthService.username();
 
  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    console.log('Unauthorized !');
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    // $state.go('login');
    console.log('Session lost !');
  });

  $scope.add = function() {
    var text = $scope.task;

    var selectDate = $filter('date')($scope.date,'yyyy-MM-dd');
    console.log(selectDate);
    text = text.trim();
    if (text.length > 0) {
  		$scope.tasks.$add({
        task:text,
        date:selectDate,
        done:false
      });
    }

    $scope.task = "";
    $scope.date = "";
	};

	$scope.remove = function() {
		var oldList = $scope.tasks;
		$scope.tasks = [];
		angular.forEach(oldList, function(x) {
		    if (!x.done) $scope.tasks.push(x);
		});
	};
});
/*
app.directive('myDirective', function($compile) {
  return {
    restrict: 'E',
    scope: {
      myDirectiveVar: '=',
    },
    template: '<input class="form-control date" ng-model="myDirectiveVar" value="123">',
    replace: true,
    link: function($scope, elem, attr, ctrl) {
      $(elem).val('Testing');
    }
  };
});

app.directive('mydatepicker', function($parse) {
  return {
    restrict: 'E',    
    scope:{
      varDate:'='
    },
    template: '<input type="text" size="50" class="form-control date" ng-model="varDate" />',
    replace: true,
    link: function($scope, elem, attr, ctrl) {
      // $(elem).datepicker({
      //   startDate: new Date(),
      //   todayHighlight: true,
      //   autoclose: true          
      // });
    }
  }
});
*/