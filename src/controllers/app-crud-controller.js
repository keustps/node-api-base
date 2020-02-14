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

    list(req, res, next) {

        let filtros = {};

        //Caso receba um objeto do tipo filtro
        if (!!req.query.filtro) {
            filtros = JSON.parse(req.query.filtro);
        } else if (!!req.query && !!req.query.ativo) {
            //Caso receba um query param ?ativo=true, filtra apenas os ativos
            filtros = {
                ativo: req.query.ativo,
                dtDesativacao: {$exists: false}
            };
        }else {
            //Por padrão não exibe os registros com data de desativação
            filtros = {
                dtDesativacao: {$exists: false}
            };
        }

        var consulta = this.model.find(filtros);

        //Caso receba os parâmetros de paginação
        if(!!req.query.skip && !!req.query.limit){
            var consulta = consulta.skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
        }

        consulta.lean().exec()
        .then((data) => {
            res.status(200).send(data);
        }).catch((e) => {
            logger.error(e);
            res.status(500).send(new AppError(500, systemMessages.CrudErrors.WHEN_READ(this.entityName), err));
        });
    }

    delete(req, res, next) {
        this.model.findByIdAndUpdate({ _id: req.params.id }, { dtDesativacao: new Date() }, { new: true})
            .exec()
            .then((data) => {
                res.status(200).send(data);
            }).catch((e) => {
                logger.error(e);
                res.status(500).send(new AppError(500, systemMessages.CrudErrors.WHEN_DELETE(this.entityName), err));
            });
    }

    get(req, res) {
        var consulta = this.model.findById(req.params.id);
        consulta.lean().exec()
            .then((data) => {
                res.status(200).send(data);
            }).catch((e) => {
                logger.error(e);
                res.status(500).send(new AppError(500, systemMessages.CrudErrors.WHEN_READ(this.entityName), err));
            });
    };

    post(req, res) {
        const data = Object.assign({}, req.body) || {};
        //Caso possua o cabeçalho de autenticação adiciona a informação do usuário que está criando o resgitro.
        if(!!req.headers.authorization){
            try {
                let obj = authService.DecodeToken(req.headers.authorization);
                if(!!obj.id){
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
    };

    put(req, res, next) {
        const data = Object.assign({}, req.body) || {};

        //Caso possua o cabeçalho de autenticação adiciona a informação do usuário que está criando o resgitro.
        if(!!req.headers.authorization){
            try {
                let obj = authService.DecodeToken(req.headers.authorization);
                if(!!obj.id){
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
