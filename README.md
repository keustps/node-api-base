# Node API Base Project

## Features
* Configuration module with [dotenv](https://github.com/motdotla/dotenv) package.
* Route module for centralization of all application routes.
* Logger module inclunding support for external log server.  
(In order to exemplify this project use [Papertrail](https://www.papertrail.com/) ).
* Messages module for message strings centralization
* Configuration to running in **production** using [PM2](https://pm2.keymetrics.io/).
* Authentication support using JWT.
* Base controller with CRUD operations for extension having the following features:  
    - Query filter using query params
    - Pagination support
    - Soft delete support
    - Validation support
* Database integration and Object Modeling Tool using [mongoose](https://mongoosejs.com/).
* CORS enabled.
* Request validation using [express-validator](https://express-validator.github.io/docs/) 
* Better messages for mongoose unique and required validations.
* Migrations for easy database changes tracking and syncing across all develop team.
* Included CI (Continuous Integration) with [Travis CI](https://travis-ci.org/).
* Testing with [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
* Lint using [Eslint](https://eslint.org/).
* Configuration for consistent coding styles across various editors and IDEs using [EditorConfig](https://editorconfig.org/).

## Configuration
Create a `.env` file using `.env.example` as template. Setup the following variables:
* **NODE_ENV** : Application execution enviroment
* **PORT** : Server port
* **MONGO_URI** : Connection URI for MongoDB
* **MIGRATE_dbConnectionUri** : Connection URI for store migrate plugin metadata
* **JWT_SECRET** : Secret for encrypt / decrypt jwt token
* **LOGGER_HOST** : Host for external logging server
* **LOGGER_PORT** : Port for external logging server

## Scripts
This project comes with a some npm scripts. You can run them with `npm run <script name>` :
* `start` : Run the application in development mode
* `watch` : Run the application in development mode *watching* for file changes
* `lint` : Run eslint plugin
* `fix` : Run eslint plugin and try to automatically fix problems
* `migrate` : Shortcut to run migration tool installed in *node_modules* folder
* `test` : Set the enviroment variable and run *mocha* test cases

## Test cases examples
The test cases examples can be found on test folder. There is an unit test for a generic AppError class, and integration tests for `/auth` and `/user` endpoints.

## Support for PM2
This project comes with a basic PM2 configuration file called `process.json`, for **PM2** use you could run the following command:
```
pm2 start process.json
```

## Author
Keust Pablo Silvano <keustps@gmail.com>
