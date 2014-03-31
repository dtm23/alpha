describe('Layout Controller', function() {
    var ctrl, scope;

    beforeEach(module('alpha'));

    beforeEach(function() {
        inject(function ($injector, $rootScope, $controller) {
            scope = $rootScope.$new();

            scope.contactForm = { $valid: true };

            ctrl = $controller('WelcomeCtrl', { $scope: scope });
        });
    });

    it('should exist', function() {
    });
});