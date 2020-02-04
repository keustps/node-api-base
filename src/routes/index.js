'use strict';

const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const systemMessages = require('../utils/messages');



//Auth router
router.use('/auth', authRouter);

//Default error handling when route is not found
router.use((req, res, next) => {
    if (!req.route)
        return res.status(404).json({
            message: systemMessages.RouterErrors.NOT_FOUND(req.url, req.method)
        });
    next();
});

module.exports = router;
