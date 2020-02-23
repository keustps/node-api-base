const AppBaseRepository = require('./app-base-repository');
const PostModel = require('../models/post-model');

class PostRepository extends AppBaseRepository {
    constructor() {
        super(PostModel, 'Post');
    }
}

//Singleton
module.exports = new PostRepository();
