const AppBaseRepository = require('./app-base-repository');
const UserModel = require('../models/user-model');

class UserRepository extends AppBaseRepository {
    constructor() {
        super(UserModel, 'User');
    }

    //Get a User from database by username property
    async getByUsername(username){
        try {
            return await this.model.findOne({ username : username }).lean();
        }catch(err) {
            throw new AppError(500, systemMessages.CrudErrors.WHEN_READ(this.entityName), err);
        }
    }
}

//Singleton
module.exports = new UserRepository();
