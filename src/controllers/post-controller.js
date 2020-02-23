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
    async post(req, res) {
        const data = Object.assign({}, req.body) || {};
        try {
            let obj = authService.DecodeToken(req.headers.authorization);
            //Before save post, ensure that the post author is the same as logged
            data.author = obj.id;
            req.body = data;
        }catch(err) {
            //Invalid token
            return res.status(401).send(new AppError(401, systemMessages.HttpErrors[401], err));
        }

        return super.post(req, res);
    }

    async put(req, res) {
        const id = req.params.id;
        const postToUpdate = await this.repository.getById(id);
        if(!postToUpdate) {
            return res.status(404).send(new AppError(404, systemMessages.CrudErrors.ID_NOT_FOUND(this.entityName, id)));
        }

        //Trying to get logged user information
        try {
            let user = authService.DecodeToken(req.headers.authorization);
            //Only admins can edit post from another user
            if(postToUpdate.author != user.id) {
                return res.status(401).send(new AppError(401, systemMessages.AuthErrors.ONLY_ADMIN_CAN_EDIT_POST));
            }
        }catch(err) {
            //Invalid token
            return res.status(401).send(new AppError(401, systemMessages.HttpErrors[401], err));
        }

        return super.put(req, res);
    }
}

const controller = new PostController(postRepository);
module.exports = {
    list: controller.list.bind(controller),
    get: controller.get.bind(controller),
    post: controller.post.bind(controller),
    put: controller.put.bind(controller),
    delete: controller.delete.bind(controller)
};
