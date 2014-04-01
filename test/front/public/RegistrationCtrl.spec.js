describe('Public > Registration Controller', function() {
    var ctrl, scope, http;

    beforeEach(module('alpha'));

    beforeEach(function() {
        inject(function ($injector, $rootScope, $controller) {
            scope = $rootScope.$new();
            http = $injector.get('$httpBackend');

            ctrl = $controller('RegistrationCtrl', { $scope: scope });
        });
    });

    var account = {
        username: "andrew@test.com",
        password: "password"
    };

    it('should allow you to clear errors', function() {
        scope.error = true;

        scope.clear();

        expect(scope.error).toBeFalsy();
    });

    it('should allow you to submit a valid registration', function() {
        http.expectPOST('/api/register', account).respond(200);

        scope.submit(account);
        http.flush();

        expect(scope.success).toBeTruthy();
    });

    it('should set a flag when registration fails', function() {
        http.expectPOST('/api/register', account).respond(400, { code: 1, message: "Failed" });

        scope.submit(account);
        http.flush();

        expect(scope.error.code).toBe(1);
        expect(scope.error.message).toBe("Failed");
    });
});