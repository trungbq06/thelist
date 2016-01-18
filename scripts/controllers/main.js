app.controller('MainController', function($scope, $rootScope, $state, $stateParams, $firebaseObject, $window, $firebaseArray, $filter, UserService, TaskService) {

  $scope.sdate = $stateParams.sdate;
  $rootScope.username = UserService.username();
	// Datepicker init
  $scope.inboxSelected = true;
  $scope.date = new Date();
  $scope.today = new Date();
  $scope.nextDate = new Date();
  $scope.nextDate.setDate($scope.today.getDate() + 1);

  $scope.weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  $scope.nextDates = [];
  for (var i = 2;i <= 5;i++) {
    $scope.nDate = new Date();
    $scope.nDate.setDate($scope.today.getDate() + i);
    $scope.nextDates.push($scope.nDate);
  }

  if ($scope.sdate) {
    $scope.inboxSelected = false;

    $scope.tasks = TaskService.findByDate($scope.sdate);
  } else {
    $scope.tasks = TaskService.findAll();
  }

  if (!$rootScope.main_title) {
    $rootScope.main_title = 'Inbox';
  }

  $scope.add = function() {
    var text = $scope.task;

    var selectDate = $filter('date')($scope.date,'yyyy-MM-dd');
    text = text.trim();
    if (text.length > 0 && selectDate.length > 0) {
  		$scope.tasks.$add({
        task:text,
        date:selectDate,
        done:false,
        date_done: selectDate + '_' + false
      });
    }

    $scope.task = '';
    $scope.date = new Date();
	};

  $scope.toggleCompleted = function(task) {
    // Update task
    task.date_done = task.date + '_' + task.done;
    $scope.tasks.$save(task);
  }

  $scope.cancel = function() {
    $scope.task = '';
    $scope.date = '';
  }

  $scope.checkTask = function() {
    return $scope.task;
  }

  $scope.selectInbox = function() {
    $scope.inboxSelected = true;
  }

  $scope.select = function(title) {
    $rootScope.main_title = title;
  }

  $scope.checkInbox = function() {
    return $scope.inboxSelected;
  }

	$scope.remove = function() {
		var oldList = $scope.tasks;
		$scope.tasks = [];
		angular.forEach(oldList, function(x) {
		    if (!x.done) $scope.tasks.push(x);
		});
	};
});