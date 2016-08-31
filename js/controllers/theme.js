var introCtrl = app.controller('intro', ['$scope', '$rootScope','checkToken','$state',  function ($scope, $rootScope, checkToken, $state) {
    
    if ( checkToken.loggedIn()){
        $state.go('admin');
    }

    $scope.userTheme = true;
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, options) {
            if(toState.name != "questionaire" && toState.name != "questionaireId" )
                $scope.userTheme = false;
            else
                $scope.userTheme = true;
        })

}]);
