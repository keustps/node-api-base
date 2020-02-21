const AppError = require('../utils/error');
const systemMessages = require('../utils/messages');

class AppBaseRepository {

    constructor(model, entityName) {
        this.model = model;
        this.entityName = entityName;
    }

    //Get a document from collection by id
    async getById(id){
        try {
            return await this.model.findById(id).lean();
        }catch(err) {
            throw new AppError(500, systemMessages.CrudErrors.WHEN_READ(this.entityName), err);
        }
    }

    //Get all documents from collection using a filter object
    async getAll(filter, skip, limit){
        try {
            if(!filter) filter = {};
            let searchQuery = this.model.find(filter);

            //Pagination support
            if(skip){
                searchQuery = searchQuery.skip(parseInt(skip));
            }
            if(limit){
                searchQuery = searchQuery.limit(parseInt(limit));
            }

            return await searchQuery.lean();

        }catch(err) {
            throw new AppError(500, systemMessages.CrudErrors.WHEN_READ(this.entityName), err);
        }
    }

    //Create a document in the collection
    async add(data){
        try {
            return await this.model.create(data);
        }catch(err) {
            throw new AppError(500, systemMessages.CrudErrors.WHEN_READ(this.entityName), err);
        }
    }

    //Update a document by id in a collection
    async updateById(id, data){
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true});
        }catch(err) {
            throw new AppError(500, systemMessages.CrudErrors.WHEN_DELETE(this.entityName), err);
        }
    }

    //This method supports both physical and soft deletion
    async removeById(id, softDelete = true){
        try {
            //If is a soft delete
            if(softDelete) {
                return await this.model.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true});
            }
            return await this.model.findByIdAndDelete(id);

        }catch(err) {
            throw new AppError(500, systemMessages.CrudErrors.WHEN_DELETE(this.entityName), err);
        }
    }

}

module.exports = AppBaseRepository;
