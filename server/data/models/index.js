const orm = require('../db/connection');

const User = orm.import('./users');

module.exports = {
  UserModel: User,
};
