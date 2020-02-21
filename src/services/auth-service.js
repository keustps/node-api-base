'use strict';
const config = require('../config');
const jwt = require('jsonwebtoken');
const systemMessages = require('../utils/messages');

const generateToken = (data) => {
    return jwt.sign(data, config.jwt.secret);
};

const decodeToken = (token) => {
    let plainToken = token;
    if (token.split(' ')[0] === 'Bearer') {
        plainToken = token.split(' ')[1];
    }
    var data = jwt.verify(plainToken, config.jwt.secret);
    return data;
};

const authorize = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
        res.status(401).json({
            message: systemMessages.HttpErrors[401]
        });
    } else {
        jwt.verify(token, config.jwt.secret, (error) => {
            if (error) {
                res.status(401).json({
                    message: systemMessages.AuthErrors.INVALID_TOKEN
                });
            } else {
                next();
            }
        });
    }
};

const isAdmin = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
        res.status(401).json({
            message: systemMessages.HttpErrors[401]
        });
    } else {
        jwt.verify(token, config.jwt.secret, (error, decoded) => {
            if (error) {
                res.status(401).json({
                    message: systemMessages.AuthErrors.INVALID_TOKEN
                });
            } else {
                if (decoded.roles.includes('admin')) {
                    next();
                } else {
                    res.status(403).json({
                        message: systemMessages.AuthErrors.ONLY_ADMIN
                    });
                }
            }
        });
    }
};

module.exports = {
    GenerateToken : generateToken,
    DecodeToken : decodeToken,
    Authorize : authorize,
    IsAdmin : isAdmin
};
