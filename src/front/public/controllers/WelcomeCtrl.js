app.controller('WelcomeCtrl', ['$scope', '$interval', function($scope, $interval) {
    $scope.currentTime = new Date();

    $interval(function() {
        $scope.currentTime = new Date();
    }, 1000);
}]);