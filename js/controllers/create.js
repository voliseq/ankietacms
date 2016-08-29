var mainCtrl = app.controller('createCtrl', ['$scope','$compile','$http','checkToken', function($scope, $compile, $http, checkToken){
	$scope.position = 0;
	$scope.question = {
		text: '',
		type: 0
	};
	$scope.questions = [];
	$scope.success = false;
	$scope.questionaire = {name: '', questions: [], active: 0};
	$scope.confirm = function()
	{	
		// if($scope.success)
		// 	$scope.questionaire.questions = JSON.parse($scope.questionaire.questions);
		// $scope.questionaire.questions = JSON.stringify($scope.questionaire.questions);
		var copyQ = JSON.parse(JSON.stringify($scope.questionaire));
		copyQ.questions = JSON.stringify(copyQ.questions);
		$http.post('api/site/post/create/',{
			questionaire: copyQ,
			token: checkToken.raw()
		}).success(function(data){
			$scope.success = true;
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