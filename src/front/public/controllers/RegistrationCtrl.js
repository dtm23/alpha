app.controller('RegistrationCtrl', ['$scope', '$resource', function($scope, $resource) {
    var registration = $resource('/api/register');

    $scope.clear = function() {
        $scope.error = false;
    };

    $scope.validatePassword = function(form) {
        // Check password length
        if(form.password.$modelValue && form.password.$modelValue.length < 6) {
            form.password.$setValidity('length', false);
        } else {
            form.password.$setValidity('length', true);
        }

        // Check password strength
        // TODO: Implement password strength

        // Check password matching
        if(form.password.$modelValue != form.repeat.$modelValue) {
            form.repeat.$setValidity('match', false);
        } else {
            form.repeat.$setValidity('match', true);
        }
    };

    $scope.submit = function(account) {
        registration.save(account, function() {
            $scope.success = true;
        }, function(error) {
            $scope.error = error.data;
        });
    };
}]);