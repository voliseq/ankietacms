app.directive('stars', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/partials/stars.html',
        replace: true
    }
});
app.directive('buttonki', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/partials/buttonki.html',
        replace: true,
    }
});
app.directive('faces', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/partials/faces.html',
        replace: true,
        scope:{
            rate: "="
        }
    }
});
app.directive('calendar', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/directives/partials/calendar.html',
        replace: true,
        scope: {
            a: "=",
            b: "=",
            c: "=",
            d: "="
        }
    }
});