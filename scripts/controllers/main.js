app.controller('mainController', function($scope, $firebaseObject) {
  var ref = new Firebase("https://thetodo.firebaseio.com");
  // download the data into a local object
  $scope.noteList = $firebaseObject(ref);
  console.log($scope.noteList);

  $scope.add = function() {
    var text = $scope.noteInput;
    text = text.trim();
    if (text.length > 0) {
  		$scope.noteList.push({noteText:$scope.noteInput, done:false});
    }

    $scope.noteInput = "";
	};

	$scope.remove = function() {
		var oldList = $scope.noteList;
		$scope.noteList = [];
		angular.forEach(oldList, function(x) {
		    if (!x.done) $scope.noteList.push(x);
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

      var html = '<input type="text" size="50" class="form-control date" id="datepicker" />';

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