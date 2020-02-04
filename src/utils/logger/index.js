const winston = require('winston');
//
// Requiring `winston-papertrail` will expose
// `winston.transports.Papertrail`
//
require('winston-papertrail').Papertrail;

const config = require('../../config');

let logger;

if (config.env == 'test' || config.env == 'local' || config.env == 'development') {
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