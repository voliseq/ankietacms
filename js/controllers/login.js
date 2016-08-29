var loginCtrl = app.controller('loginCtrl', ['$scope', '$http','store', 'checkToken','$state', function($scope, $http, store, checkToken,  $state){
	if ( checkToken.loggedIn()){
		$state.go('admin');
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
			window.location.reload();
		}
		
	}).error( function(){
	});


	};
}]);