var adminCtrl = app.controller('adminCtrl', ['$scope', '$http','store', 'checkToken', '$state', function($scope, $http, store, checkToken, $state){
	var isLogged = checkToken.loggedIn();
	if (!isLogged){
		console.log(isLogged);
		$state.go( 'login' );
	}

}]);