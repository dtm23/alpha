var app = angular.module('alpha', ['ngRoute'])
    .config(['$routeProvider', function($routes) {
        $routes.
            when('/', {
                controller: 'WelcomeCtrl', templateUrl: 'partials/welcome.html'
            })
            .when('/not-found', {
                templateUrl: 'partials/404.html'
            })
            .otherwise({
                redirectTo: '/not-found'
            });
    }]);