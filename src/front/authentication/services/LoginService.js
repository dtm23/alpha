app.factory('AuthenticationService', ['$http', function($http) {

    var login = function(url, credentials, successCallback, errorCallback) {
        function connect () {
            return $http({
                method: 'POST',
                url: url,
                data: credentials
            }).success(successCallback).error(errorCallback);
        }

        return connect();
    };

    var logout = function(url, successCallback, errorCallback) {
        function disconnect() {
            return $http({
                method: 'POST',
                url: url
            }).success(successCallback).error(errorCallback);
        }

        return disconnect();
    };

    return { login: login, logout: logout };
}]);