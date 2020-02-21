'use strict';

const User = require('../models/user-model');
const AppCrudController = require('./app-crud-controller');
const userRepository = require('../repositories/user-repository');

const controller = new AppCrudController(userRepository);
module.exports = {
    list: controller.list.bind(controller),
    get: controller.get.bind(controller),
    post: controller.post.bind(controller),
    put: controller.put.bind(controller),
    delete: controller.delete.bind(controller)
};
