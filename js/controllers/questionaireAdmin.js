var questionaireAdminCtrl = app.controller('questionaireAdminCtrl', ['$scope','$http', 'questionaire', 'votes', function($scope, $http, questionaire, votes){

	// init

	$scope.questionaire = questionaire.data[0];
	$scope.votesQ = votes.data;
	$scope.position = 0;
	$scope.questions = JSON.parse($scope.questionaire.questions);

	var amount = $scope.questions.length;

	$scope.typeQ = parseInt($scope.questions[0].type);
	console.log($scope.typeQ);
	$scope.textQ = $scope.questions[0].text;
	$scope.nameQ = $scope.questionaire.name;
	$scope.rating = {
		rate: 1,
		max: 5,
		isReadonly: false
	};

	$scope.labels = ['0','1', '2', '3', '4', '5'];
	$scope.data = [];
	$scope.chartData = [];
	$scope.series = ['Series A'];

	$scope.votes = {idQ: $scope.questionaire.id, votes: [], date: new Date(), ip: ''};
	for(var i = 0; i < amount; i++){
		$scope.votes.votes[i] = $scope.rating.rate;
	};
	// buttons
	$scope.voteQ = function(){
		$scope.votes.votes[$scope.position] = $scope.rating.rate;
		console.log($scope.votes);
	}
	$scope.sendVote = function(){
			$scope.votes.votes = JSON.stringify($scope.votes.votes);
		$http.post( 'api/site/post/fakeUpdate/' , {
			votes : $scope.votes
		}).success( function( data ){	


		}).error( function(){
		});
	}
	$scope.nextQ = function(){
		if(($scope.position + 1) < $scope.questions.length){
			$scope.rating.rate = $scope.votes.votes[$scope.position];
			$scope.position += 1;
			$scope.textQ = $scope.questions[$scope.position].text;
			$scope.typeQ = parseInt($scope.questions[$scope.position].type);
			$scope.rating.rate = $scope.votes.votes[$scope.position];
			$scope.chartData = $scope.data[$scope.position];
		}
		else{
			return false;
		}
	};
	$scope.previousQ = function(){
		if($scope.position != 0){
			$scope.rating.rate = $scope.votes.votes[$scope.position];
			$scope.position -= 1;
			$scope.textQ = $scope.questions[$scope.position].text;
			$scope.typeQ = parseInt($scope.questions[$scope.position].type);
			$scope.rating.rate = $scope.votes.votes[$scope.position];
			$scope.chartData = $scope.data[$scope.position];	
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

	var countVotes = function(){
		for(var i = 0; i < amount; i++){
			var votes, vote;
			$scope.data[i] = [];
			for(var j = 0; j < 6; j++ ){
				$scope.data[i][j] = 0;
				for(var k = 0; k < $scope.votesQ.length; k++){
					votes = JSON.parse($scope.votesQ[k].votes);
					vote = votes[i];
					if(vote === j){
						$scope.data[i][j]++;
					}
				}
			}
		}
		$scope.chartData = $scope.data[0];
	}

	countVotes();

}]);