### Project Alpha

This project is a baseline for building a node express application with angular front-end

Named project alpha this is just that, the alpha version of a product, ready to use but with no business value yet built.

Features instrumented include:

- Grunt builds (production, development and test automation)
- Bower and Node package managers to include required assets
- Karma test runner with Jasmine 2.0 for BDD
- Application routes for home (/) and 404 errors

#### Getting the project running

Pre-requisites;

- Node 0.12 or newer
- Grunt CLI (can be installed after node using 'npm install -g grunt-cli')

After cloning the project run the following commands;

- npm install
- grunt

Note: For general development once you have run the grunt command use 'grunt run' this will simply rebuild the javascript and css style files when changes occur.

Testing your code...

If using grunt run tests are not automatically executed to allow for responsive changes to the UI being available at all time, instead use 'grunt test-only' this will execute your test scripts.

#### Future development

This project was uploaded as a start point for several projects covering the main concerns frequently written. The package management assumes the future dependencies wont break the code base as it uses 'latest' in most instances.

The intention is to keep this up to date and move other common assets across when the need to enrich this base is required.