app.factory('AuthenticationService', ['$http', function($http) {

    var login = function(url, credentials, successCallback, errorCallback) {
        var url = url,
            credentials = credentials;

        function connect () {
            return $http({
                method: 'POST',
                url: url,
                data: credentials
            }).success(successCallback).error(errorCallback);
        }

        return connect();
    }

    var logout = function(url, successCallback, errorCallback) {
        var url = url;

        function disconnect() {
            return $http({
                method: 'POST',
                url: url
            }).success(successCallback).error(errorCallback);
        }

        return disconnect();
    }

    var service = { login: login, logout: logout };
    return service;
}]);