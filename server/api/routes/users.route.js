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
    .then(users => res.send(users))
    .catch(next);
});

router.post('/', (req, res, next) => {
  createUser({ ...req.body })
    .then(user => res.send(user))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  updateUser(id, { ...req.body })
    .then((data) => res.send(data))
    .catch(next);
});

router.delete('/', (req, res, next) => {
  console.log(req.method);
  console.log(req.query);
  const { ids } = req.query;
  deleteSelectedUsers(ids)
    .then(() => res.send({ ids: ids }))
    .catch(next);
});

module.exports = router;
