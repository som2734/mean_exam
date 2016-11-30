console.log('Game Factory');
myApp.factory('GameFactory', ['$http', '$location', function($http,$location){
	var factory={};

  factory.create = function(game,callback){
		console.log('data sent to reg factory', game);
		$http({
			method: "POST",
			url: "/create",
			data: game
		}).then(function(res){
			console.log('data from server to game factory', res.data);
			callback(res.data);
		})
  },
  // factory.getStats = function(stats, callback){
  //   $http({
  //     method: "get",
  //     url: "/stats"
  //   }).then(function(res){
  //     callback(res.data);
  //   })
  // },
	factory.show = function(callback){
		$http({
			method: "get",
			url: "/game"
		}).then( function(res){
			callback(res.data);
		});
	},
	// factory.play = function(id, score, callback){
	// 	$http({
	// 		method: "POST",
	// 		url: "/play/"+id,
	// 		data: score
	// 	}).then(function(res){
	// 		callback(res.data);
	// 	})
	// }
	factory.answer = function(id, callback){
		$http({
			method: "POST",
			url: "/answer/"+id
		}).then(function(res){
			callback(res.data);
		})
	}
	// factory.fakeA= function(id, callback){
  //   $http({
  //     method: "POST",
  //     url: "/fakeA/"+id
  //   }).then(function(res){
  //     callback(res.data);
  //   })
  // },
	// factory.fakeB= function(id, callback){
  //   $http({
  //     method: "POST",
  //     url: "/fakeB/"+id
  //   }).then(function(res){
  //     callback(res.data);
  //   })
  // }

  return factory;
}]);
