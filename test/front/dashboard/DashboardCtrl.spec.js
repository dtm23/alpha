describe('Dashboard > Dashboard Controller', function() {
    var ctrl, scope;

    beforeEach(module('alpha'));

    beforeEach(function() {
        inject(function ($injector, $rootScope, $controller) {
            scope = $rootScope.$new();

            ctrl = $controller('DashboardCtrl', { $scope: scope });
        });
    });

    it('should exist', function() {
    });
});