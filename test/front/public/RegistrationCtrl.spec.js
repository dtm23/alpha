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

    describe('When validating the password', function() {
        it('should check to ensure password length is at least six characters', function() {
            var form = {
                password: { $modelValue: "qwerty", $setValidity: jasmine.createSpy() },
                repeat: { $setValidity: jasmine.createSpy() }
            };
            scope.validatePassword(form);
            expect(form.password.$setValidity).toHaveBeenCalledWith('length', true);
        });

        it('should set validity to false if password length is not at least six characters', function() {
            var form = {
                password: { $modelValue: "qwert", $setValidity: jasmine.createSpy() },
                repeat: { $setValidity: jasmine.createSpy() }
            };
            scope.validatePassword(form);
            expect(form.password.$setValidity).toHaveBeenCalledWith('length', false);
        });

        it('should check the strength of the password', function() {
            // TODO: Implement password strength testing
        });

        it('should check that password matches with a repeated password value', function() {
            var form = {
                password: { $modelValue: "qwerty", $setValidity: jasmine.createSpy() },
                repeat: { $modelValue: "qwerty", $setValidity: jasmine.createSpy() }
            };
            scope.validatePassword(form);
            expect(form.repeat.$setValidity).toHaveBeenCalledWith('match', true);
        });

        it('should set validity to false if password does not match with a repeated password value', function() {
            var form = {
                password: { $modelValue: "qwerty", $setValidity: jasmine.createSpy() },
                repeat: { $modelValue: "", $setValidity: jasmine.createSpy() }
            };
            scope.validatePassword(form);
            expect(form.repeat.$setValidity).toHaveBeenCalledWith('match', false);
        });
    });
});