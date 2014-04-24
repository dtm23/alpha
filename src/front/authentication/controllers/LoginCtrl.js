app.controller('LoginCtrl', ['$scope', '$location', 'AuthenticationService', function($scope, $location, $auth) {

    $scope.clear = function() {
        $scope.error = false;
    };

    $scope.submit = function(credentials) {
        $auth.login('/api/auth/login', credentials, function(account) {
            $scope.$emit('_accountChange', account);
            $location.path('/dashboard');
        }, function(error) {
            $scope.error = error;
        });
    };
}]);