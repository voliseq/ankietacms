var questionaireCtrl = app.controller('questionaireCtrl', ['$scope','$http', 'questions', '$timeout', '$state', function($scope, $http, questions, $timeout, $state){

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
		max: 5,
		isReadonly: false
	};
	// nav
	$scope.nextt = true;
	// voting
	$scope.voted = false;
	$scope.votes = {idQ: $scope.questionaire.id, votes: [], date: new Date(), ip: ''};
	for(var i = 0; i < amount; i++){
		$scope.votes.votes[i] = $scope.rating.rate;
	};
	// buttons
	$scope.voteQ = function(obj = false){
		if(obj){
			$scope.rating.rate = parseInt(obj.target.attributes.value.value);
		}
		$scope.votes.votes[$scope.position] = $scope.rating.rate;
		console.log($scope.rating);
		console.log($scope.votes.votes);
	}
	$scope.sendVote = function(){
		$scope.voted = true;
		$scope.votes.votes = JSON.stringify($scope.votes.votes);
		$http.post( 'api/site/post/fakeUpdate/' , {
			votes : $scope.votes
		}).success( function( data ){	

			$scope.voted = true;
			$timeout(function(){
				$state.reload();
			}, 2000)
		}).error( function(){
		});
	}
	$scope.nextQ = function(){
		if(($scope.position + 1) < $scope.questions.length){
			$scope.nextt = true;
			$scope.rating.rate = $scope.votes.votes[$scope.position];
			$scope.position += 1;
			$scope.textQ = $scope.questions[$scope.position].text;
			$scope.typeQ = parseInt($scope.questions[$scope.position].type);
			$scope.rating.rate = $scope.votes.votes[$scope.position];
			if($scope.position + 1 == $scope.questions.length){
				$scope.nextt = false;
			}
		}
		else{
			return false;
		}
	};
	$scope.previousQ = function(){
		$scope.nextt = true;
		if($scope.position != 0){
			$scope.rating.rate = $scope.votes.votes[$scope.position];
			$scope.position -= 1;
			$scope.textQ = $scope.questions[$scope.position].text;
			$scope.typeQ = parseInt($scope.questions[$scope.position].type);
			$scope.rating.rate = $scope.votes.votes[$scope.position];	
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