const User = require('../src/models/user');

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  await User.insertMany({ username: 'Alice', password: 'alice' }, { username: 'Bob', password: 'bob' });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
    await User.deleteMany({ username: 'Alice' }, { username: 'Bob' });
}

module.exports = { up, down };
