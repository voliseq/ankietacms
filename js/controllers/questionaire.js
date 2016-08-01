var questionaireCtrl = app.controller('questionaireCtrl', ['$scope','$http', 'questions', function($scope, $http, questions){

	// init

	$scope.questionaire = questions.data[0];
	$scope.position = 0;
	$scope.questions = JSON.parse($scope.questionaire.questions);
	var amount = $scope.questions.length;

	$scope.typeQ = parseInt($scope.questionaire.type);
	$scope.textQ = $scope.questions[0].text;
	$scope.nameQ = $scope.questionaire.name;
	$scope.rating = {
		rate: 1,
		max: 10,
		isReadonly: false
	};

	// voting

	$scope.votes = [];
	$scope.vote = {rate: $scope.rating.rate, date: new Date()};
	for(var i = 0; i < amount; i++){
		$scope.votes[i] = $scope.vote;
	};
	// buttons
	$scope.voteQ = function(){
		$scope.vote.date = new Date();
		$scope.vote.rate = $scope.rating.rate;
		$scope.votes[$scope.position] = $scope.vote;
		$scope.vote = {rate: 1, date: new Date()};
		console.log($scope.votes);
	}
	$scope.sendQ = function(){
		
	}
	$scope.nextQ = function(){
		if(($scope.position + 1) < $scope.questions.length){
			$scope.rating.rate = $scope.votes[$scope.position].rate;
			$scope.position += 1;
			$scope.textQ = $scope.questions[$scope.position].text;
			$scope.typeQ = parseInt($scope.questions[$scope.position].type);
			$scope.rating.rate = $scope.votes[$scope.position].rate;
		}
		else{
			return false;
		}
	};
	$scope.previousQ = function(){
		if($scope.position != 0){
			$scope.rating.rate = $scope.votes[$scope.position].rate;
			$scope.position -= 1;
			$scope.textQ = $scope.questions[$scope.position].text;
			$scope.typeQ = parseInt($scope.questions[$scope.position].type);
			$scope.rating.rate = $scope.votes[$scope.position].rate;	
		}
		else{
			return;
		}

	};


	//angular ui staff
  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };


}]);