var myApp = angular.module('myApp', ['ngRoute'])
myApp.factory('loginInterceptor', ['$q', '$location', function($q, $location){
  return{
    'responseError': function(rejection){
      if(rejection.status == 401){
        $location.url('/');
      }
      return $q.reject(rejection);
    }
  }
}])
myApp.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('loginInterceptor');
	$routeProvider
  .when('/', {
    templateUrl: 'partials/login.html',
    controller: 'UserController'
  })
  .when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'profileController'
  })
  .when('/create', {
    templateUrl: 'partials/create.html',
    controller: 'CreateController'
  })
  .when('/game', {
    templateUrl: 'partials/game.html',
    controller: 'GameController'
  })

	.otherwise('/');
})
