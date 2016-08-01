var registerCtrl = app.controller( 'registerCtrl' , [ '$scope' , '$http' , function( $scope , $http ){

	$scope.user = {};

	$scope.formSubmit = function ( user ) {

		$http.post( 'api/site/user/create/' , {
			user : user,
			name : user.name,
			email : user.email,
			password : user.password,
			passconf : user.passconf
		}).success( function( errors ){

			$scope.submit = true;
			$scope.user = {};
			
			if ( errors )
			{
				$scope.errors = errors;
			}
			else
			{
				$scope.errors = {};
				$scope.success = true;
			}
			
		}).error( function(){
			console.log( 'Błąd połączenia z API' );
		});


	};

}]);