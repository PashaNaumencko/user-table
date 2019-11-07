const BaseRepository = require('./base.repository');
const { UserModel } = require('../models/index');

class UserRepository extends BaseRepository {}

module.exports = new UserRepository(UserModel);
