'use strict';

const mongoose = require('mongoose');
const bcrypt = require('mongoose-bcrypt');
const AppBaseSchema = require('./app-base-schema');

const userSchema = new AppBaseSchema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: 'There is another user with this login ({VALUE})',
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: true,
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
