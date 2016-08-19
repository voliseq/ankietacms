var questionairesCtrl = app.controller('questionairesCtrl', ['$scope','$http', 'questions', 'dataService', function($scope, $http, questions, dataService){

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