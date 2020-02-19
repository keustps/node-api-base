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
    - Soft delete
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

## Author
Keust Pablo Silvano <keustps@gmail.com>
