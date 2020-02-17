const winston = require('winston');
require('winston-papertrail').Papertrail;
const config = require('../../config');

let logger;

//Isolating server response on test cases
if (config.env == 'test') {
    logger = new winston.createLogger({
        transports : [
            new winston.transports.File({ filename: 'test/tests.log' })
        ]
    });
}else if (config.env == 'local' || config.env == 'development') {
    logger = console;
} else {
    const papertrailTransport = new winston.transports.Papertrail({
        host: config.logger.host,
        port: config.logger.port,
    });

    logger = new winston.createLogger({
        transports: [papertrailTransport],
    });
}

module.exports = logger;
