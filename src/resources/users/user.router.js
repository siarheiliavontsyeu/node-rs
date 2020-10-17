const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('../../utils/validator');
const { userCreate, userUpdate } = require('../../schemas/userSchema');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post([validator(userCreate)], async (req, res) => {
  const { login, password, name } = req.body;
  const user = await usersService.create(new User({ login, password, name }));
  res.json(User.toResponse(user));
});

router.route('/:id').put([validator(userUpdate)], async (req, res) => {
  try {
    const { login, password, name } = req.body;
    const { id } = req.params;
    const user = await usersService.update({ id, login, password, name });
    res.json(User.toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
