console.log('User Factory');
myApp.factory('UserFactory', ['$http', '$location', function($http,$location){
	var factory={};

  factory.register = function(newUser,callback){
		console.log('data sent to reg factory', newUser);
		$http({
			method: "POST",
			url: "/",
			data: newUser
		}).then(function(res){
			console.log('data from server to reg factory', res.data);
			callback(res.data);
		})
  },
  factory.login = function(user, callback){
		console.log(user);
		$http({
			method: "POST",
			url: "/login",
			data: user
		}).then(function(res){
			callback();
		})
  },
	factory.current = function(callback){
		$http({
			method:"get",
			url: "/currentUser"
		}).then(function(res){
			callback(res.data);
		})
	},
  // factory.Profile = function(callback){
  //   console.log('logged in')
  //   $http.get('/profile').then(function(returned_data){
  //     callback(returned_data.data);
  //   })
  // },
  factory.logout = function(callback){
    $http.post('/logout').then(function(returned_data){
      callback();
    })
  },
  factory.getUsers = function(callback){
    //call factory method if you want to update or set the friends variable
    $http.get('/getUsers').then(function(returned_data){
      console.log(returned_data.data);
      if (typeof(callback) == 'function'){
        callback(returned_data.data);
      }
    });
  }
  return factory;
}]);
