var questionairesCtrl = app.controller('questionairesCtrl', ['$scope','$http', 'questions', 'dataService', function($scope, $http, questions, dataService){

	$scope.questionaires = questions.data;

	console.log($scope.questionaires);

	$scope.activate = function(id){
		$http.post( 'api/site/post/activate/' + id , {
		}).success( function( data ){	
			console.log("activated");

		}).error( function(){
			console.log("error");
		});		
	}

}]);