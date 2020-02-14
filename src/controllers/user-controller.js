'use strict';

const logger = require('../utils/logger');
const User = require('../models/user-model');
const AppCrudController = require('./app-crud-controller');

const controller = new AppCrudController(User, 'user');

module.exports = {
    list: controller.list.bind(controller),
    get: controller.get.bind(controller),
    post: controller.post.bind(controller),
    put: controller.put.bind(controller),
    delete: controller.delete.bind(controller)
}
