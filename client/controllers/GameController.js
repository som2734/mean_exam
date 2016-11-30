myApp.controller('GameController', ['$scope', '$routeParams', '$location','UserFactory', 'GameFactory', function($scope, $routeParams, $location, UserFactory, GameFactory){
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

  $scope.game ={};
  var show = function(){
    GameFactory.show(function(data){
      $scope.game = data;
    })
  };
  show();

  $scope.answer = function(id){
    GameFactory.answer(id, function(data){
      show();
      $location.url('/profile')
    })
  };
  //
  // $scope.fakeA = function(id){
  //   GameFactory.fakeA(id, function(data){
  //     show();
  //   })
  // };
  //
  // $scope.fakeB = function(id){
  //   GameFactory.fakeB(id, function(data){
  //     show();
  //   })
  // };


}]);
