'use strict';

const express = require('express');
const router = express.Router();
//const controller = require('../controllers/auth-controller');

router.post('/', (req, res) => {
    return res.status(200).json({
        message: 'auth'
    });
});

module.exports = router;
