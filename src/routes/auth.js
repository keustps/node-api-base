'use strict';

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//const controller = require('../controllers/auth-controller');

router.post('/', [
    check('username').notEmpty().withMessage('Username cant be empty'),
    check('password').notEmpty().withMessage('Password cant be empty')
], (req, res) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    return res.status(200).json({
        message: 'auth'
    });
});

module.exports = router;
