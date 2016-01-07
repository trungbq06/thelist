app.controller('mainController', function($scope, $firebaseArray) {
  var ref = new Firebase("https://thetodo.firebaseio.com/tasks");
  // download the data into a local object
  $scope.tasks = $firebaseArray(ref);

  $scope.add = function() {
    var text = $scope.task;
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

app.directive('mydatepicker', function($parse) {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    compile: function(element, attrs) {
      var modelAccessor = $parse(attrs.ngModel);

      var html = '<input type="text" size="50" class="form-control date" id="datepicker" ng-model="date" />';

      var newElem = $(html);
      element.replaceWith(newElem);

      return function(scope, element, attrs, controller) {
        var processChange = function () {
           var date = new Date(element.datepicker("getDate"));

           scope.$apply(function (scope) {
              // Change bound variable
              modelAccessor.assign(scope, date);
           });
        };

        $(element).datepicker({
          startDate: new Date(),
          todayHighlight: true,
          autoclose: true          
        });

        scope.$watch(modelAccessor, function (val) {
           var date = new Date(val);
           // element.datepicker();
        });
      }
    }
  }
});