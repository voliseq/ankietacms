app.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider){

	$urlRouterProvider.otherwise('/')

	$stateProvider
		.state('questionaire',{
			url: '/',
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
		.state('admin',{
			url: '/admin',
			templateUrl: 'partials/admin/admin.html',
			controller: 'adminCtrl'
		})
		.state('admin.create',{
			url: '/create',
			templateUrl: 'partials/admin/create.html',
			controller: 'createCtrl'
		})
		.state('admin.questionaires',{
			url: '/questionaires',
			templateUrl: 'partials/admin/questionaires.html',
			controller: 'questionairesCtrl',
			resolve: {
				questions: ['dataService', function(dataService){
					return dataService.getAllQuestions();
				}]
			}
		})
		.state('admin.questionaire',{
			url: '/questionaire/:id',
			templateUrl: 'partials/admin/questionaireAdmin.html',
			controller: 'questionaireAdminCtrl',
			resolve: {
				questionaire: ['dataService', '$stateParams', function(dataService, $stateParams){
					return dataService.getQuestionaire($stateParams.id);
				}],
				votes: ['dataService', '$stateParams', function(dataService, $stateParams){
					return dataService.getVotesQ($stateParams.id);
				}]
			}
		})
}]);