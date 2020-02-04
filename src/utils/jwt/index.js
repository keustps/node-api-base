const jwt = require('express-jwt');
const config = require('../../config');

//Validating the JWT Token using the configured secret
const middleware = jwt({
    secret: config.jwt.secret,
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
    });

module.exports = middleware;