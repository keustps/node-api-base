
const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('../logger');

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    logger.info(`Successfully connected to ${config.database.uri} MongoDB cluster in ${config.env} mode.`);
});

mongoose.connection.on('reconnected', () => {
    logger.info(`Successfully reconnected to ${config.database.uri} MongoDB cluster in ${config.env} mode.`);
});

mongoose.connection.on('disconnected', () => {
    logger.info('Connection Disconnected');
});

mongoose.connection.on('close', () => {
    logger.info('Connection Closed');
});

mongoose.connection.on('error', (err) => {
    logger.error('Error while attempting to connect to database:');
	logger.error(err);
});

const run = async () => {
    logger.info('Trying to connect to database...');
    await mongoose.connect(config.database.uri, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useFindAndModify : false,
        useUnifiedTopology : true
    });
};

module.exports = {
    Run : run,
    connection : mongoose.connection
};
