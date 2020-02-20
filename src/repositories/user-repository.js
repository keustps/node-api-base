const AppBaseRepository = require('./app-base-repository');
const UserModel = require('../models/user-model');

class UserRepository extends AppBaseRepository {
    constructor() {
        super(UserModel, 'User');
    }
}

//Singleton
module.exports = new UserRepository();
