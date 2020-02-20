'use strict';

const AppError = require('../utils/error');
const logger = require('../utils/logger');
const authService = require('../services/auth-service');
const systemMessages = require('../utils/messages');
//const AppBaseRepository = require('../repositories/app-base-repository');

class AppCrudController {

    constructor(model, entityName, repository) {
        this.model = model;
        this.entityName = entityName;
        this.repository = repository;
    }

    async list(req, res) {

        let filters = {};

        try {
            //Supporting filter query
            if (req.query.filter) {
                filters = JSON.parse(req.query.filter);
            } else if (req.query && req.query.active) {
                //If there is a query param "?active=true", search only the active ones
                filters = {
                    active: req.query.active,
                    deletedAt: {$exists: false}
                };
            }else {
                //Search only the active ones by default
                filters = {
                    deletedAt: {$exists: false}
                };
            }

            let data = await this.repository.getAll(filters, req.query.skip, req.query.limit);
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
            let id = req.params.id;
            let data = await this.repository.removeById(id);
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
            let id = req.params.id;
            let data = await this.repository.getById(id);
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

    post(req, res) {
        const data = Object.assign({}, req.body) || {};
        //Get the logged user information to inject updatedBy information
        if(req.headers.authorization){
            try {
                let obj = authService.DecodeToken(req.headers.authorization);
                if(obj.id){
                    data.updatedBy = obj.id;
                }
            }catch(err) {
                //Invalid token
                return res.status(401).send(new AppError(401, systemMessages.HttpErrors[401], err));
            }
        }

        this.model.create(data)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            if (err.name == 'ValidationError') {
                res.status(422).send(new AppError(422, systemMessages.CrudErrors.WHEN_CREATE(this.entityName), err));
            } else {
                logger.error(err);
                res.status(500).send(new AppError(500, null, err));
            }
        });
    }

    put(req, res) {
        const data = Object.assign({}, req.body) || {};

        //Caso possua o cabeçalho de autenticação adiciona a informação do usuário que está criando o resgitro.
        if(req.headers.authorization){
            try {
                let obj = authService.DecodeToken(req.headers.authorization);
                if(obj.id){
                    data.updatedBy = obj.id;
                }
            }catch(err) {
                //Invalid token
                return res.status(401).send(new AppError(401, systemMessages.HttpErrors[401], err));
            }
        }

        this.model.findByIdAndUpdate({ _id: req.params.id }, data, { new: true})
        .exec()
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(err => {
            if (err.name == 'ValidationError') {
                res.status(422).send(new AppError(422, systemMessages.CrudErrors.WHEN_UPDATE(this.entityName), err));
            } else {
                logger.error(err);
                res.status(500).send(new AppError(500, null, err));
            }
        });
    }
}

module.exports = AppCrudController;
