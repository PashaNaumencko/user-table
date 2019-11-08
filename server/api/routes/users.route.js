const { Router } = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteSelectedUsers
} = require('../services/users.service');

const router = Router();

router.get('/', (req, res, next) => {
  console.log(req.baseUrl);
  getAllUsers()
    .then(users => {
      console.log()
      return res.send(users)
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  createUser({ ...req.body })
    .then(user => res.send(user))
    .catch(next);
});

router.put('/', (req, res, next) => {
  const { id } = req.body;
  updateUser(id, { ...req.body })
    .then((data) => res.send(data))
    .catch(next);
});

router.delete('/', (req, res, next) => {
  const { ids } = req.query;
  deleteSelectedUsers(ids)
    .then(() => res.send({ ids: ids }))
    .catch(next);
});

module.exports = router;
