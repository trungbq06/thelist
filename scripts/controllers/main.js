app.controller('mainController', function($scope, $firebaseArray) {
  var ref = new Firebase("https://thetodo.firebaseio.com/tasks");
  // download the data into a local object
  $scope.tasks = $firebaseArray(ref);

  $scope.add = function() {
    var text = $scope.task;
    console.log($scope.date);
    text = text.trim();
    if (text.length > 0) {
  		$scope.tasks.$add({
        task:text,
        date:$scope.date,
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