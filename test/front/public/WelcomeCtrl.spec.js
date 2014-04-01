describe('Public > Layout Controller', function() {
    var ctrl, scope, interval;

    beforeEach(module('alpha'));

    beforeEach(function() {
        inject(function ($injector, $rootScope, $interval, $controller) {
            scope = $rootScope.$new();
            interval = $interval;

            ctrl = $controller('WelcomeCtrl', { $scope: scope, $interval: interval });
        });
    });

    it('should exist and tick the time', function() {
        expect(scope.currentTime).toBeDefined();

        var time = angular.copy(scope.currentTime);

        interval.flush(2000);

        expect(scope.currentTime).not.toBe(time);
    });
});