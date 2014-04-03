app.controller('LoginCtrl', ['$scope', '$location', '$cookies', 'AuthenticationService', function($scope, $location, $cookies, $auth) {

    $scope.clear = function() {
        $scope.error = false;
    };

    $scope.submit = function(credentials) {
        console.log(credentials);
        $auth.login('/api/auth/login', credentials, function(response) {
            $cookies.account = response;
            $location.path('/dashboard');
        }, function(error) {
            $scope.error = error;
        });
    };
}]);