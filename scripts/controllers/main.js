app.controller('mainController', function($scope, $firebaseObject) {
  var ref = new Firebase("https://thetodo.firebaseio.com");
  // download the data into a local object
  $scope.data = $firebaseObject(ref);
  $scope.noteList = [];

  $scope.add = function() {
		$scope.noteList.push({noteText:$scope.noteInput, done:false});
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