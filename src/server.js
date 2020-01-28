'use strict';

require('dotenv').config();

//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const jwt = require('express-jwt');

//Reading system messages from a central message module
const systemMessages = require('./utils/messages');
//Application configurations module
const config = require('./config');
//Application custom logger module
const logger = require('./utils/logger');

//Context path for the API
const BASE_PATH = "/api";
const api = express();

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
api.use(
    jwt({
        secret: process.env.SECRET,
        getToken: function fromHeaderOrQuerystring(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        }
    })
    .unless({
        path: [
            '/',
            /\/auth\/?/,
            //For create new users
            { url: /\/user\/?/, methods: ['POST'] }
        ]
    })
);

//When the token is invalid, throw a 401 HTTP error code
api.use((err, req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({
            message: systemMessages.HttpErrors[401]
        });
	}
});

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

