'use strict';

const AppError = require('../utils/error');
const logger = require('../utils/logger');
const authService = require('../services/auth-service');
const systemMessages = require('../utils/messages');

class AppCrudController {

    constructor(model, entityName) {
        this.model = model;
        this.entityName = entityName;
    }

    list(req, res) {

        let filters = {};

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

        var searchQuery = this.model.find(filters);

        //Pagination support
        if(req.query.skip && req.query.limit){
            searchQuery = searchQuery.skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
        }

        searchQuery.lean().exec()
        .then((data) => {
            res.status(200).send(data);
        }).catch((err) => {
            logger.error(err);
            res.status(500).send(new AppError(500, systemMessages.CrudErrors.WHEN_READ(this.entityName), err));
        });
    }

    delete(req, res) {
        //Not a physical delete, but a soft delete
        this.model.findByIdAndUpdate({ _id: req.params.id }, { deletedAt: new Date() }, { new: true})
            .exec()
            .then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                logger.error(err);
                res.status(500).send(new AppError(500, systemMessages.CrudErrors.WHEN_DELETE(this.entityName), err));
            });
    }

    get(req, res) {
        var searchQuery = this.model.findById(req.params.id);
        searchQuery.lean().exec()
            .then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                logger.error(err);
                res.status(500).send(new AppError(500, systemMessages.CrudErrors.WHEN_READ(this.entityName), err));
            });
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
