'use strict';

const AppError = require('../utils/error');
const logger = require('../utils/logger');
const authService = require('../services/auth-service');
const systemMessages = require('../utils/messages');
//const AppBaseRepository = require('../repositories/app-base-repository');

class AppCrudController {

    constructor(repository) {
        this.repository = repository;
    }

    async list(req, res) {

        let filters = {};

        try {
            //Supporting filter query
            if (req.query.filter) {
                filters = JSON.parse(req.query.filter);
            }else if (req.query && req.query.active) {
                //If there is a query param "?active=true", search only the active ones
                //If there is a query param "?active=false", search only the inactive ones
                filters = {
                    deletedAt: { $exists :  req.query.active == 'false' }
                };
            }

            const data = await this.repository.getAll(filters, req.query.skip, req.query.limit);
            if(!data) {
                return res.status(404).send(new AppError(404, systemMessages.CrudErrors.NOT_FOUND(this.entityName)));
            }
            return res.status(200).send(data);
        }catch(err) {
            logger.error(err);
            if(err instanceof AppError){
                return res.status(err.code).send(err);
            }
            return res.status(500).send(new AppError(500, err));
        }
    }

    async delete(req, res) {

        try {
            const id = req.params.id;
            const data = await this.repository.removeById(id);
            if(!data) {
                return res.status(404).send(new AppError(404, systemMessages.CrudErrors.ID_NOT_FOUND(this.entityName, id)));
            }
            //No response on delete
            return res.status(200).send({});
        }catch(err) {
            logger.error(err);
            if(err instanceof AppError){
                return res.status(err.code).send(err);
            }
            return res.status(500).send(new AppError(500, err));
        }
    }

    async get(req, res) {
        try {
            const id = req.params.id;
            const data = await this.repository.getById(id);
            if(!data) {
                return res.status(404).send(new AppError(404, systemMessages.CrudErrors.ID_NOT_FOUND(this.entityName, id)));
            }
            return res.status(200).send(data);
        }catch(err) {
            logger.error(err);
            if(err instanceof AppError){
                return res.status(err.code).send(err);
            }
            return res.status(500).send(new AppError(500, err));
        }
    }

    async post(req, res) {
        try {
            const data = Object.assign({}, req.body) || {};
            //Get the logged user information to inject updatedBy information
            if(req.headers.authorization){
                try {
                    const obj = authService.DecodeToken(req.headers.authorization);
                    if(obj.id){
                        data.updatedBy = obj.id;
                    }
                }catch(err) {
                    //Invalid token
                    return res.status(401).send(new AppError(401, systemMessages.HttpErrors[401], err));
                }
            }

            const newUser = await this.repository.add(data);
            return res.status(200).send(newUser);
        }catch(err) {
            logger.error(err);
            if(err instanceof AppError){
                return res.status(err.code).send(err);
            }
            return res.status(500).send(new AppError(500, err));
        }
    }

    async put(req, res) {
        try {
            const id = req.params.id;
            const data = Object.assign({}, req.body) || {};
            //Get the logged user information to inject updatedBy information
            if(req.headers.authorization){
                try {
                    const obj = authService.DecodeToken(req.headers.authorization);
                    if(obj.id){
                        data.updatedBy = obj.id;
                    }
                }catch(err) {
                    //Invalid token
                    return res.status(401).send(new AppError(401, systemMessages.HttpErrors[401], err));
                }
            }

            const newUser = await this.repository.updateById(id, data);
            return res.status(200).send(newUser);
        }catch(err) {
            logger.error(err);
            if(err instanceof AppError){
                return res.status(err.code).send(err);
            }
            return res.status(500).send(new AppError(500, err));
        }
    }
}

module.exports = AppCrudController;
