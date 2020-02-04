'use strict';

//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

//Reading system messages from a central message module
const systemMessages = require('./utils/messages');
//Application configurations module
const config = require('./config');
//Application custom logger module
const logger = require('./utils/logger');
//Application JWT middleware
const jwt = require('./middlewares/jwt');

//Importe express middleware
const api = express();

//Context path for the API
const BASE_PATH = '/api';
//Importing routes file
const routes = require('./routes');

//Accepting CORS
api.use(cors());
//Enabling compression
api.use(compression());
//OPTIONAL: Increasing the maximum request body size for JSON
api.use(bodyParser.json({ limit: '50mb' }));
//OPTIONAL: Increasing the maximum request body size for URLENCODED
//MANDATORY: The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format
api.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//Validating the JWT Token using the configured secret
api.use(jwt);
//Throw a 401 HTTP error code when token is invalid
api.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: systemMessages.HttpErrors[401]
        });
    }
});

//Setting the application routes
api.use(BASE_PATH, routes);

api.listen(config.server.port, err => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
    //require('./utils/db');
    logger.info(
        `API is now running on port ${config.server.port} in ${config.env} mode`
    );
});

module.exports = api;

