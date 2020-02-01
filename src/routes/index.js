'use strict';

const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const systemMessages = require('../utils/messages');

//Context path for the API
const BASE_PATH = "/api";

//Auth router
router.use(`${BASE_PATH}/auth`, authRouter);

//Default error handling when route is not found
router.use((req, res, next) => {
    if (!req.route)
        return res.status(404).json({
            message: systemMessages.RouterErrors.NOT_FOUND(req.url, req.method)
        });
    next();
});

module.exports = router;
