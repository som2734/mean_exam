myApp.controller('UserController', ['$scope', '$location', '$routeParams', 'UserFactory', function($scope, $location, $routeParams, UserFactory){
	/*
  THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
  WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
*/
	var getUsers = function(){
		UserFactory.getUsers(function(data){
			$scope.users=data;
			console.log($scope.users);
		});
	};

	$scope.user = {};
	var currentUser = function(){
		UserFactory.current(function(data){
			$scope.user = data;
			$location.url('/profile')
		})
	};

	$scope.register = function(newUser){
		UserFactory.register(newUser, function(data){
			console.log('from reg server', data)
			console.log('from reg client', newUser)
			if (data.hasOwnProperty('errors')){
				$scope.regErrors = data.errors
			}
			else{
				// $location.url('/profile');
				$scope.register = {};
				console.log('successfull registration!');
			}
		});
	};

  $scope.login = function(user){
		console.log(user);
    UserFactory.login(user, function(){
			$location.url('/profile');
		})
  };

	$scope.logout = function(){
		UserFactory.logout($scope.user, function(){
			$location.url('/')
		});
	};

}]);
