describe('Authentication > Logout Controller', function() {
    var ctrl, scope, http, location, cookies;

    beforeEach(module('alpha'));

    beforeEach(function() {
        inject(function ($injector, $rootScope, $location, $controller) {
            scope = $rootScope.$new();
            http = $injector.get('$httpBackend');
            location = $location;
            cookies = {};
            spyOn(location, 'path');
        });
    });

    describe('On success', function() {
        beforeEach(function() {
            inject(function ($controller) {
                http.expectPOST('/api/auth/logout').respond(200);
                ctrl = $controller('LogoutCtrl', { $scope: scope, $location: location, $cookies: cookies });
            });
        });

        it('should allow you to login if authentication information is correct', function() {
            http.flush();

            expect(cookies.account).toBe("");

            expect(location.path).toHaveBeenCalledWith('/');
        });
    });

    describe('On failure', function() {
        beforeEach(function() {
            inject(function ($controller) {
                http.expectPOST('/api/auth/logout').respond(400);
                ctrl = $controller('LogoutCtrl', { $scope: scope, $location: location, $cookies: cookies });
            });
        });

        it('should flag an error if credentials are not valid', function() {
            http.flush();

            expect(location.path).toHaveBeenCalledWith('/dashboard');
        });
    });
});