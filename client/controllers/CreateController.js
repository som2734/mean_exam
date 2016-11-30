myApp.controller('CreateController', ['$scope', '$routeParams', '$location','UserFactory', 'GameFactory', function($scope, $routeParams, $location, UserFactory, GameFactory){
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

  $scope.newQ ={};
  $scope.create = function(game){
    GameFactory.create(game, function(data){
			$scope.newQ = data;
      $location.url('/profile');
    });
  };

}]);
