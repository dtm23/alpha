app.controller('LogoutCtrl', ['$scope', '$location', 'AuthenticationService', function($scope, $location, $auth) {

    $auth.logout('/api/auth/logout', function() {
        $location.path('/');
    }, function() {
        $location.path('/dashboard');
    });

}]);