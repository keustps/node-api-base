require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    const: {
        MAXIMO_MINS_ATIVO: 40
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    server: {
        host: 'localhost',
        port: process.env.PORT
    },
    database: {
        uri: process.env.MONGO_URI
    },
    logger: {
        host: process.env.LOGGER_HOST,
        port: process.env.LOGGER_PORT,
    },

};

module.exports = config;
