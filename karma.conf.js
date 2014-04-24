module.exports = function (config) {
    config.set({

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-firefox-launcher',
            'karma-coverage-0.11',
            'karma-spec-reporter'
        ],

        basePath: '.',

        frameworks: [
            'jasmine'
        ],

        files: [
            'src/vendor/angular/angular.js',
            'src/vendor/angular-*/*.js',
            'src/front/**/*.js',
            'test/front/**/*.spec.js'
        ],

        //logLevel: LOG_DEBUG,

        autoWatch: true,

        browsers: [
            //'Safari',
            //'Chrome',
            //'Firefox',
            'PhantomJS'
        ],

        preprocessors: {
            'src/front/**/*.js': 'coverage'
        },

        reporters: [
            "spec",
            "coverage"
        ],

        coverageReporter: {
            type: 'lcov',
            dir: 'logs/karma/'
        }
    })
}