describe('Layout Controller', function() {
    var ctrl, scope;

    beforeEach(module('alpha'));

    beforeEach(function() {
        inject(function ($injector, $rootScope, $controller) {
            scope = $rootScope.$new();

            scope.contactForm = { $valid: true };

            ctrl = $controller('LayoutCtrl', { $scope: scope });
        });
    });

    it('should assign the location of the header and footer templates', function() {
        expect(scope.header).toBeDefined();
        expect(scope.footer).toBeDefined();
    });
});