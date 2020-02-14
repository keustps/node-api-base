'use strict';

const mongoose = require('mongoose');
const AppBaseSchema = require('./app-base-schema');

const postSchema = new AppBaseSchema({
    author:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'O campo modelo é obrigatório.']
    },


}, { collection: 'posts' });

module.exports = mongoose.model('Post', postSchema);



