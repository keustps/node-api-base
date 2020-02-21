const bcrypt = require('bcrypt');
const authService = require('../services/auth-service');
const systemMessage = require('../utils/messages');
const logger = require('../utils/logger');
const userRepository = require('../repositories/user-repository');
const AppError = require('../utils/error');

const authenticate = async (req, res) => {

    try {

        let user = await userRepository.getByUsername(req.body.username);
        //Is there an user with this username in the database?
        if(!user){
            return res.status(401).send({ message: systemMessage.AuthErrors.WRONG_USER_OR_PASS });
        }else {

            try {
                //Is the user password equal to password received?
                let valid = await bcrypt.compare(req.body.password, user.password);

                if(!valid){
                    return res.status(401).send({ message: systemMessage.AuthErrors.WRONG_USER_OR_PASS });
                }else {
                    //User and password match, generating jwt token
                    let token = authService.GenerateToken({id: user._id, username: user.username, role: user.master ? 'admin' : 'default'});
                    delete user.password;

                    //Return that user
                    return res.status(201).send({
                        token: token,
                        user: user
                    });

                }

            }catch(error) {
                logger.error('Error when compare password (bcrypt)', error);
                return res.status(401).send({ message: systemMessage.AuthErrors.WRONG_USER_OR_PASS });
            }

        }

    }catch(err) {
        logger.error(err);
        if(err instanceof AppError){
            return res.status(err.code).send(err);
        }
        return res.status(500).send(new AppError(500, err));
    }

};

module.exports = {
    Authenticate: authenticate
};
