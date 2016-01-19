app.controller('MainController', function($scope, $rootScope, $state, $stateParams, $firebaseObject, $window, $firebaseArray, $filter, UserService, TaskService) {

  $scope.sdate = $stateParams.sdate;
  $rootScope.username = UserService.username();
	// Datepicker init
  $scope.inboxSelected = true;
  $scope.date = new Date();
  $scope.nextDates = [];
  $scope.today = new Date();
  $scope.nextDate = new Date();
  $scope.nextDate.setDate($scope.today.getDate() + 1);

  $scope.weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  $scope.nextDates.push($scope.today);
  $scope.nextDates.push($scope.nextDate);

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

	$scope.remove = function(task) {
		$scope.tasks.$remove(task);
	}

  $scope.checkDate = function(date, task) {
    date = $scope.formatDate(date);

    return date == task.date;
  }

  $scope.showDate = function(date) {
    if (date == $scope.today) {
      return 'Today';
    } else if (date == $scope.nextDate) {
      return 'Tomorrow';
    } else {
      return $scope.weeks[date.getDay()];
    }
  }

  $scope.showDateDetail = function(date) {

  }

  $scope.hasTask = function(date) {
    date = $scope.formatDate(date);
    var isTask = false;
    $scope.tasks.forEach(function(data) {
      if (data.date == date) {
        isTask = true;
        return;
      }
    });

    return isTask ? '' : 'no-task';
  }

  $scope.formatDate = function(date) {
    return date.getFullYear() + '-' + ( '0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate();
  }

  $scope.isSelectingDate = function(date) {
    if ($scope.sdate) {
      date = $scope.formatDate(date);

      return $scope.sdate != date;
    }
  }
});