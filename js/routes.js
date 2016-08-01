app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('intro',{
			url: '/',
			templateUrl: 'partials/admin/create.html',
			controller: 'createCtrl'
		})
		.state('questionaire',{
			url: '/questionaire',
			templateUrl: 'partials/admin/questionaire.html',
			controller: 'questionaireCtrl',
			resolve: {
				questions: ['dataService', function(dataService){
					return dataService.getQuestions();
				}]
			}
		})
		.state('login',{
			url: '/login',
			templateUrl: 'partials/admin/login.html',
			controller: 'loginCtrl'
		})
		.state('register',{
			url: '/register',
			templateUrl: 'partials/admin/register.html',
			controller: 'registerCtrl'
		})
}]);