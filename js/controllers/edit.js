var editCtrl = app.controller('editCtrl', ['$scope','$compile','$http','checkToken','questionaire', function($scope, $compile, $http, checkToken, questionaire){
	$scope.position = 0;
	$scope.success = false;
	$scope.questionaire = questionaire.data[0];
	$scope.questionaire.questions = JSON.parse($scope.questionaire.questions)
	$scope.question = $scope.questionaire.questions[0];
	$scope.confirm = function()
	{	
		var copyQ = JSON.parse(JSON.stringify($scope.questionaire));
		copyQ.questions = JSON.stringify(copyQ.questions);
		console.log($scope.questionaire);
		$http.post('api/site/post/updateQ/'+$scope.questionaire.id,{
			questionaire: copyQ,
			token: checkToken.raw()
		}).success(function(data){
			alert("Edycja zakonczona powodzeniem ! ")
		}).error(function(){
			
		});
	};



	$scope.nextQ = function(){
		if($scope.questionaire.questions[$scope.position] === undefined){
			return;
		}
		$scope.position+=1;

		if($scope.questionaire.questions[$scope.position] === undefined){
			$scope.question = {
				text: '',
				type: 0
			};
		}
		else
			$scope.question = $scope.questionaire.questions[$scope.position];


	}
	$scope.previousQ = function(){
		if($scope.position == 0)
			return;
		$scope.position-=1;
		$scope.question = $scope.questionaire.questions[$scope.position];
	}


	$scope.addQ = function(question){
		$scope.questionaire.questions[$scope.position] = $scope.question;
		console.log($scope.questionaire);
	}

	$scope.setPosition = function(position){
		$scope.position = position;
		$scope.question = $scope.questionaire.questions[$scope.position];
	}

	// angular ui

	$scope.rate = 0;
	$scope.max = 5;
	$scope.isReadonly = false;

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.ratingStates = [
	{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
	{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
	{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
	{stateOn: 'glyphicon-heart'},
	{stateOff: 'glyphicon-off'}
	];

}]);