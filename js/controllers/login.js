var loginCtrl = app.controller('loginCtrl', ['$scope', '$http','store', 'checkToken', '$location' ,'$state', function($scope, $http, store, checkToken, $location, $state){
	if ( checkToken.loggedIn()){
		$location.path( '/admin' );
	}
	$scope.user = {};
	$scope.formSubmit = function ( user ) {

	$http.post( 'api/site/user/login/' , {
		email : user.email,
		password : user.password
	}).success( function( data ){	
		$scope.submit = true;	
		$scope.error = data.error;
		
		if ( !data.error )
		{
			store.set( 'token' , data.token );
			$state.go('admin');
		}
		
	}).error( function(){
	});


	};
}]);