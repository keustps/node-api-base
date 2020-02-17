'use strict';

const mongoose = require('mongoose');
const AppBaseSchema = require('./app-base-schema');
const systemMessages = require('../utils/messages');

const postSchema = new AppBaseSchema({
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, systemMessages.ModelValidation.IS_REQUIRED('Title')]
    },
    text: {
        type: String,
        required: [true, systemMessages.ModelValidation.IS_REQUIRED('Text')]
    },


}, { collection: 'posts' });

module.exports = mongoose.model('Post', postSchema);



