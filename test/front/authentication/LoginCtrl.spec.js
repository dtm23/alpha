describe('Authentication > Login Controller', function() {
    var ctrl, scope, http, location;

    beforeEach(module('alpha'));

    beforeEach(function() {
        inject(function ($injector, $rootScope, $location, $controller) {
            scope = $rootScope.$new();
            http = $injector.get('$httpBackend');
            location = $location;

            spyOn(scope, '$emit');
            spyOn(location, 'path');

            ctrl = $controller('LoginCtrl', { $scope: scope, $location: location });
        });
    });

    it('should allow you to clear errors', function() {
        scope.error = true;
        scope.clear();
        expect(scope.error).toBeFalsy();
    });

    it('should allow you to login if authentication information is correct', function() {
        var account = { forename: "Andrew", surname: "Cunliffe" };
        http.expectPOST('/api/auth/login', {username: "andrew", password: "qwerty" }).respond(200, account);
        scope.submit({ username: "andrew", password: "qwerty" });
        http.flush();

        expect(scope.$emit).toHaveBeenCalledWith('_accountChange', account);
        expect(location.path).toHaveBeenCalledWith('/dashboard');
    });

    it('should flag an error if credentials are not valid', function() {
        http.expectPOST('/api/auth/login').respond(400, { code: 1, message: "Failed" });
        scope.submit({ username: "", password: "" });
        http.flush();

        expect(scope.error.code).toBe(1);
        expect(scope.error.message).toBe("Failed");
        expect(location.path).not.toHaveBeenCalled();
    });
});