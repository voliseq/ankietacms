var mainCtrl = app.controller('createCtrl', ['$scope','$compile','$http','checkToken', function($scope, $compile, $http, checkToken){
	$scope.position = 0;
	$scope.question = {
		text: '',
		type: 1
	};
	$scope.questionaire = {name: '', questions: [], active: 0};
	$scope.confirm = function()
	{	
		$scope.questionaire.questions = JSON.stringify($scope.questionaire.questions);
		console.log($scope.questionaire);
		$http.post('api/site/post/create/',{
			questionaire: $scope.questionaire,
			questions: $scope.questions,
			token: checkToken.raw()
		}).success(function(errors){
			$scope.errors = errors;
			if(!errors)
			{
				$scope.success = true;
			}
		}).error(function(){
			
		});
	};



	$scope.nextQ = function(){
		if($scope.questionaire.questions[$scope.position] === undefined){
			console.log('undefined');
			return;
		}
		$scope.position+=1;
		$scope.question = {
		text: '',
		type: 1
	};

	}
	$scope.previousQ = function(){
		if($scope.position == 0)
			return;
		$scope.position-=1;
		$scope.question = $scope.questionaire.questions[$scope.position];
	}


	$scope.addQ = function(question){
		$scope.questionaire.questions[$scope.position] = $scope.question;
	}

	// angular ui
	 
	$scope.rate = 0;
	$scope.max = 10;
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