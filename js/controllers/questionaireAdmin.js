var questionaireAdminCtrl = app.controller('questionaireAdminCtrl', ['$scope','$http', 'questionaire', 'votes', 'checkToken','$state','dataService',  function($scope, $http, questionaire, votes, checkToken, $state, dataService){

	var isLogged = checkToken.loggedIn();
	if (!isLogged){
		$state.go( 'login' );
	}


	// init
	$scope.questionaire = questionaire.data[0];
	$scope.questionaire.questions = JSON.parse($scope.questionaire.questions);
	$scope.votesQ = votes.data;
	$scope.position = 0;
	$scope.questions = $scope.questionaire.questions;
	var amount = $scope.questions.length;
	$scope.typeQ = parseInt($scope.questionaire.questions[0].type);
	$scope.textQ = $scope.questionaire.questions[0].text;
	$scope.nameQ = $scope.questionaire.name;
	$scope.rating = {
		rate: 1,
		max: 5,
		isReadonly: false
	};

	$scope.data = [];
	$scope.series = ['Series A'];
	$scope.votes = {idQ: $scope.questionaire.id, votes: [], date: new Date(), ip: ''};
	for(var i = 0; i < amount; i++){
		$scope.votes.votes[i] = $scope.rating.rate;
	};

	//dates
	$scope.dt2 = new Date();
	$scope.dt = new Date(parseInt($scope.questionaire.posttime * 1000));

	//angular ui staff
	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	var countVotes = function(){
		for(var i = 0; i < amount; i++){
			$scope.questionaire.questions[i].chart = {};
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
				$scope.data[i][j] = $scope.data[i][j]/$scope.votesQ.length * 100;
			}
			$scope.questionaire.questions[i].chart = $scope.data[i];
			if($scope.questionaire.questions[i].type == 0)
				$scope.questionaire.questions[i].labels = ['0','1', '2', '3', '4', '5'];
			else if($scope.questionaire.questions[i].type == 1)
				$scope.questionaire.questions[i].labels = ['0', '1'];
			else
				$scope.questionaire.questions[i].labels = ['0', '1', '2'];
		}
		$scope.chartData = $scope.data[0];
	}

	$scope.getVotesBetweenDates = function(){
		dataService.getVotesBetweenDates($scope.questionaire.id, $scope.dt.getTime(), $scope.dt2.getTime())
		.then(function(data){
			$scope.votesQ = data.data;
			countVotes();
		});
	};


	countVotes();
	console.log($scope.data);
	console.log($scope.questionaire);



//datepicker

$scope.clear = function() {
	$scope.dt = null;
};

$scope.inlineOptions = {
	customClass: getDayClass,
	minDate: new Date(),
	showWeeks: true
};

$scope.dateOptions = {
	formatYear: 'yy',
	maxDate: new Date(2020, 5, 22),
	minDate: new Date(),
	startingDay: 1
};

$scope.toggleMin = function() {
	$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
	$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
};

$scope.toggleMin();

$scope.open1 = function() {
	$scope.popup1.opened = true;
};

$scope.open2 = function() {
	$scope.popup2.opened = true;
};

$scope.setDate = function(year, month, day) {
	$scope.dt = new Date(year, month, day);
};

$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
$scope.format = $scope.formats[0];
$scope.altInputFormats = ['M!/d!/yyyy'];

$scope.popup1 = {
	opened: false
};

$scope.popup2 = {
	opened: false
};

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var afterTomorrow = new Date();
afterTomorrow.setDate(tomorrow.getDate() + 1);
$scope.events = [
{
	date: tomorrow,
	status: 'full'
},
{
	date: afterTomorrow,
	status: 'partially'
}
];

function getDayClass(data) {
	var date = data.date,
	mode = data.mode;
	if (mode === 'day') {
		var dayToCheck = new Date(date).setHours(0,0,0,0);

		for (var i = 0; i < $scope.events.length; i++) {
			var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

			if (dayToCheck === currentDay) {
				return $scope.events[i].status;
			}
		}
	}

	return '';
}

}]);