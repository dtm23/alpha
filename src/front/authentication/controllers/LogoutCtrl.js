app.controller('LogoutCtrl', ['$scope', '$location', '$cookies', 'AuthenticationService', function($scope, $location, $cookies, $auth) {

    $auth.logout('/api/auth/logout', function() {
        $cookies.account = "";
        $location.path('/');
    }, function() {
        $location.path('/dashboard');
    });

}]);