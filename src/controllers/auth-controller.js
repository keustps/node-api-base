const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const authService = require('../services/auth-service');
const systemMessage = require('../utils/messages');
const logger = require('../utils/logger');

const authenticate = (req, res) => {
    User.findOne({
        username: req.body.username
    }).lean().exec().then( user => {
        logger.log('user: ', user);
        //Is there an user with this username in the database?
        if(!user){
            return res.status(401).send({ message: systemMessage.AuthErrors.WRONG_USER_OR_PASS });
        }else {
            //Is the user password equal to password received?
            bcrypt.compare(req.body.password, user.password)
            .then( valid =>{
                if(!valid){
                    return res.status(401).send({ message: systemMessage.AuthErrors.WRONG_USER_OR_PASS });
                }else {
                    //User and password match, lets generate the jwt token
                    let token = authService.GenerateToken({id: user._id, username: user.username, role: user.master ? 'admin' : 'default'});
                    delete user.password;

                    //Return that user
                    return res.status(201).send({
                        token: token,
                        user: user
                    });

                }
            })
            .catch( error => {
                logger.error('Error when compare password (bcrypt)', error);
                return res.status(401).send({ message: systemMessage.AuthErrors.WRONG_USER_OR_PASS });
            });

        }

    })
    .catch( error => {
        logger.error('Error when getting user in database', error);
        return res.status(500).send({ message: systemMessage.HttpErrors[500] });
    });


};

module.exports = {
    Authenticate: authenticate
};
