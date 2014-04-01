app.controller('RegistrationCtrl', ['$scope', '$resource', function($scope, $resource) {
    var registration = $resource('/api/register');

    $scope.clear = function() {
        $scope.error = false;
    };

    $scope.submit = function(account) {
        registration.save(account, function() {
            $scope.success = true;
        }, function(error) {
            $scope.error = error.data;
        });
    };
}]);