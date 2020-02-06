'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const uniqueValidation = require('mongoose-beautiful-unique-validation');
const util = require('util');
const Schema = mongoose.Schema;

//AppBaseSchema to keep common fields across many collections
const appBaseSchema = function AppBaseSchema() {
    Schema.apply(this, arguments);

    //User that updated this object
    this.add({
        updatedBy:  {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    });

    //To keep track of any change
    this.add({
        deletedAt: Date
    });
    this.plugin(timestamps);

    //Including unique validation plugin to better validation messages
    this.plugin(uniqueValidation);
    this.index({ updatedBy: 1});
};

//Inherits from Mongoose Schema
util.inherits(appBaseSchema, Schema);

module.exports = appBaseSchema;
