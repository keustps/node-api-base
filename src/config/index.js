require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    const: {
        MAXIMO_MINS_ATIVO: 40
    },
    server: {
        port: process.env.PORT
    },
    database: {
        uri: process.env.MONGO_URI
    },
};

module.exports = config