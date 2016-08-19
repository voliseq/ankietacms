app.service('dataService', ['$http', function($http) {


  this.getQuestions = function() {
    return $http.get('api/site/post/getActive/');
  };

  this.getAllQuestions = function(){
  	return $http.get('api/site/post/getAll')
  };

  this.getQuestionaire = function(id){
  	return $http.get('api/site/post/getOne/' + id);
  };
   this.getVotesQ = function(id){
  	return $http.get('api/site/post/getVotes/' + id);
  };
   this.activate = function(id){
    return $http.get('api/site/post/activate/' + id);
  };
  this.deleteQ = function(id){
    return $http.get('api/site/post/delete/' +id);
  }
}]);