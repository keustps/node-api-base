const User = require('../src/models/user');

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  await User.insertMany({ userName: 'Alice', password: 'alice' }, { userName: 'Bob', password: 'bob' });
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
    await User.deleteMany({ userName: 'Alice' }, { userName: 'Bob' });
}

module.exports = { up, down };
