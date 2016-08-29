var introCtrl = app.controller('intro', ['$scope', '$rootScope', function ($scope, $rootScope) {
    console.log("eeeeoo");
    $scope.userTheme = true;
    $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, options) {
            if(toState.name != "questionaire")
                $scope.userTheme = false;
            else
                $scope.userTheme = true;
        })

}]);
