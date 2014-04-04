### Project Alpha

This project is a baseline for building a node express application with angular front-end.

Named project alpha this is just that, the alpha version of a product, ready to use but with no business value yet built.

Technologies / libraries used include;

- Grunt (builds for production, development and test automation)
- Bower and Node package management for assets
- Karma test runner with Jasmine 2.0 for BDD
- MySQL for Node

Features instrumented include;

- Example registration page with backend
- Example authentication with backend and forgotten password

#### Getting the project running

Pre-requisites;

- Node 0.10 or newer
- Grunt CLI (can be installed after node using `npm install -g grunt-cli`)

After cloning the project run the following commands;

- npm install
- grunt

Note: For general development once you have run the `grunt` command you can use `grunt run` this will simply rebuild the javascript and css style files when changes occur.

Setting up MySQL...

- Settings can be found in server.js
- Expectation is the MySQL is running on port 3306
- Values are picked up from environment variables: DB_HOST, DB_USER, DB_PASS, DB_NAME
- Default values are: localhost, user, password, alpha

Testing your code...

If using `grunt run` tests are not automatically executed to allow for responsive changes to the UI being available at all time, instead use `grunt test-only` this will execute your test scripts.

#### Future development

This project was uploaded as a start point for several projects covering the main concerns frequently written. The package management assumes the future dependencies wont break the code base as it uses 'latest' in most instances.

The intention is to keep this up to date and move other common assets across when the need to enrich this base is required.

#### Running Example

http://alpha-example.herokuapp.com