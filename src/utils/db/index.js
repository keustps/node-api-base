
const mongoose = require('mongoose');

const config = require('../../config');
const logger = require('../logger');

mongoose.Promise = global.Promise;

const connection = mongoose.connect(config.database.uri, {useNewUrlParser : true, useUnifiedTopology : true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

connection
	.then(db => {
		logger.info(`Successfully connected to ${config.database.uri} MongoDB cluster in ${config.env} mode.`);
		return db;
	})
	.catch(err => {
		logger.error('Error while attempting to connect to database:');
		logger.error(err);
	});

module.exports = connection;
