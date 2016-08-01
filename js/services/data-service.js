app.service('dataService', ['$http', function($http) {


  this.getQuestions = function() {
    return $http.get('api/site/post/get/');
  };

}]);