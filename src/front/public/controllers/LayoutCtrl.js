app.controller('LayoutCtrl', ['$scope', function($scope) {

    $scope.$on('_accountChange', function(event, account) {
        if(account && account.username) {
            if (account.forename && account.surname) {
                account.displayName = account.forename + " " + account.surname;
            } else if (account.forename) {
                account.displayName = account.forename;
            } else {
                account.displayName = account.username;
            }
            $scope.account = account;
            $scope.header = 'partials/navigation-authenticated.html';
        } else {
            delete $scope.account;
            $scope.header = 'partials/navigation-default.html';
        }
    });

    $scope.header = 'partials/navigation-default.html';
    $scope.footer = 'partials/footer.html';
}]);