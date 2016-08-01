var loginCtrl = app.controller('loginCtrl', ['$scope', '$http','store', 'checkToken', '$location', function($scope, $http, store, checkToken, $location){
	if ( checkToken.loggedIn()){
		$location.path( '/' );
	}
	$scope.user = {};
	$scope.formSubmit = function ( user ) {

	$http.post( 'api/site/user/login/' , {
		email : user.email,
		password : user.password
	}).success( function( data ){	
		console.log("zalogowany");
		$scope.submit = true;	
		$scope.error = data.error;
		
		if ( !data.error )
		{
			store.set( 'token' , data.token );
			location.reload();
		}
		
	}).error( function(){
	});


	};
}]);