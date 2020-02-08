//Connecting to database
require('../src/utils/db');
//Loading the User mongoose model
const User = require('../src/models/user-model');

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  await User.create({ username: 'alice', password: 'alice', master: true }, { username: 'bob', password: 'bob' });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
    //Delete all documents from User collection
    await User.deleteMany({});
}

module.exports = { up, down };
