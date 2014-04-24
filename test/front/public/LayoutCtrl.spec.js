describe('Public > Layout Controller', function() {
    var ctrl, scope;

    beforeEach(module('alpha'));

    beforeEach(function() {
        inject(function ($injector, $rootScope, $controller) {
            scope = $rootScope.$new();

            spyOn(scope, '$on').and.callThrough();
            ctrl = $controller('LayoutCtrl', { $scope: scope });
        });
    });

    it('should assign the location of the header and footer templates', function() {
        expect(scope.header).toContain('navigation-default.html');
        expect(scope.footer).toContain('footer.html');
    });

    it('should listen to _accountChange messages and assign the account object and header template', function() {
        var account = { forename: "Andrew", surname: "Cunliffe", username: "andrew.c.cunliffe@gmail.com" };
        scope.$emit('_accountChange', account);
        expect(scope.$on).toHaveBeenCalled();
        expect(scope.account).toBeDefined();
        expect(scope.header).toContain('navigation-authenticated.html');
    });

    it('should listen to _accountChange messages and assign the full display name', function() {
        var account = { forename: "Andrew", surname: "Cunliffe", username: "andrew.c.cunliffe@gmail.com" };
        scope.$emit('_accountChange', account);
        expect(scope.account.displayName).toBe("Andrew Cunliffe");
    });

    it('should listen to _accountChange messages and assign a partial display name', function() {
        var account = { forename: "Andrew", username: "andrew.c.cunliffe@gmail.com" };
        scope.$emit('_accountChange', account);
        expect(scope.account.displayName).toBe("Andrew");
    });

    it('should listen to _accountChange messages and assign the username as display name', function() {
        var account = { username: "andrew.c.cunliffe@gmail.com" };
        scope.$emit('_accountChange', account);
        expect(scope.account.displayName).toBe("andrew.c.cunliffe@gmail.com");
    });

    it('should listen to _accountChange messages and if no username will clear the account data', function() {
        scope.account = { forename: "Andrew", surname: "Cunliffe", username: "andrew.c.cunliffe@gmail.com" };
        var account = {};
        scope.$emit('_accountChange', account);
        expect(scope.account).toBeUndefined();
        expect(scope.header).toContain('navigation-default.html');
    });
});