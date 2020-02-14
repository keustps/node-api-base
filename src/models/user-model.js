'use strict';

const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const AppBaseSchema = require('./app-base-schema');
const systemMessages = require('../utils/messages');

const userSchema = new AppBaseSchema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: systemMessages.ModelValidation.LOGIN_NOT_UNIQUE,
        required: [true, systemMessages.ModelValidation.IS_REQUIRED('Username') ]
    },
    password: {
        type: String,
        required: [true, systemMessages.ModelValidation.IS_REQUIRED('Password')],
        bcrypt: true
    },
    master: {
        type: Boolean,
        default: false
    },


}, { collection: 'users' });


userSchema.plugin(bcrypt);
userSchema.index({ username: 1 }, { unique: true, dropDups: true });

module.exports = mongoose.model('User', userSchema);
