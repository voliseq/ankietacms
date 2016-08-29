var questionairesCtrl = app.controller('questionairesCtrl', ['$scope','$http', 'questions', 'dataService','checkToken', '$state',  function($scope, $http, questions, dataService, checkToken, $state){

	var isLogged = checkToken.loggedIn();
	if (!isLogged){
		$state.go( 'login' );
	}

	$scope.questionaires = questions.data;
	console.log($scope.questionaires);
	$scope.delete = function(id, index){
		dataService.deleteQ(id).success(function(data){
			$scope.questionaires.splice(index, 1);
		})
	};

	$scope.activate = function(id, index){
		dataService.activate(id).success(function(data){
			angular.forEach($scope.questionaires, function(value, key){
				value['active'] = '0';
			})
			$scope.questionaires[index]['active'] = '1';
		})
	}

}]);