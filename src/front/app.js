var app = angular.module('alpha', ['ngRoute', 'ngResource', 'ngCookies'])
    .config(['$routeProvider', function($routes) {
        $routes.
            when('/', {
                controller: 'WelcomeCtrl', templateUrl: 'partials/public/welcome.html'
            })
            .when('/register', {
                controller: 'RegistrationCtrl', templateUrl: 'partials/public/register.html'
            })

            // AUTHENTICATION
            .when('/auth/login', {
                controller: 'LoginCtrl', templateUrl: 'partials/auth/login.html'
            })

            // AUTHORISED
            .when('/dashboard', {
                controller: 'DashboardCtrl', templateUrl: 'partials/under-construction.html'
            })

            // ERROR HANDLING
            .when('/not-found', {
                templateUrl: 'partials/404.html'
            })
            .otherwise({
                redirectTo: '/not-found'
            });
    }]);