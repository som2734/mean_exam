myApp.controller('profileController', ['$scope', '$routeParams', '$location','UserFactory', 'GameFactory', function($scope, $routeParams, $location, UserFactory, GameFactory){
	/*
  THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
  WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
*/
	var getCurrentUser = function(){
		UserFactory.current(function(data){
			$scope.user = data;
			console.log($scope.user);
		});
	};
  getCurrentUser();

  $scope.logout = function(){
		console.log('tried to logout')
    UserFactory.logout(function(){
      $location.url('/');
    });
  };

	var getUsers = function(){
		UserFactory.getUsers(function(data){
			$scope.users = data;
		})
	};
	getUsers();

	var show = function(){
		GameFactory.show(function(data){
			$scope.game = data;
		})
	};
	show();

	// var getStats = function(){
	// 	GameFactory.getStats(function(data){
	// 		$scope.stats = data;
	// 	});
	// };
	// getStats();

}]);
