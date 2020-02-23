'use strict';

const AppError = require('../utils/error');
const AppCrudController = require('./app-crud-controller');
const systemMessages = require('../utils/messages');
const authService = require('../services/auth-service');
const postRepository = require('../repositories/post-repository');

class PostController extends AppCrudController {
    constructor(repository){
        super(repository);
    }

    //Overriding post method
    post(req, res) {
        const data = Object.assign({}, req.body) || {};
        try {
            let obj = authService.DecodeToken(req.headers.authorization);
            //Before save post, ensure that the post author is the same as logged
            data.author = obj.id;
            res.body = data;
        }catch(err) {
            //Invalid token
            return res.status(401).send(new AppError(401, systemMessages.HttpErrors[401], err));
        }

        super.post(req, res);
    }
}

const controller = new PostController(postRepository);
module.exports = {
    get: controller.get.bind(controller),
    post: controller.post.bind(controller),
    put: controller.put.bind(controller),
    delete: controller.delete.bind(controller)
};
