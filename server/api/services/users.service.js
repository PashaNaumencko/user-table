const userRepository = require('../../data/repositories/user.repository');

const getAllUsers = () => userRepository.getAll();

const createUser = body => userRepository.create(body);

const updateUser = (userId, body) => userRepository.updateById(userId, body);

const deleteSelectedUsers =  userIds =>  userRepository.deleteByIds(userIds);

module.exports = {
 getAllUsers,
 createUser,
 updateUser,
 deleteSelectedUsers
};
