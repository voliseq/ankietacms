var adminCtrl = app.controller('adminCtrl', ['$scope', '$http','store', 'checkToken', '$location', function($scope, $http, store, checkToken, $location){
	if ( !checkToken.loggedIn()){
		$location.path( '/login' );
	}
}]);