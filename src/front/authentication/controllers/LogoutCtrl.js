app.controller('LogoutCtrl', ['$scope', '$location', 'AuthenticationService', function($scope, $location, $auth) {

    $auth.logout('/api/auth/logout', function() {
        $scope.$emit('_accountChange');
        $location.path('/');
    }, function() {
        $location.path('/dashboard');
    });

}]);