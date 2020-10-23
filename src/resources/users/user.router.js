const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const validator = require('../../utils/validator');
const { userCreate, userUpdate } = require('../../schemas/userSchema');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post([validator(userCreate)], async (req, res) => {
    const user = await usersService.create(new User(req.body));
    res.json(User.toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.json(User.toResponse(user));
  })
  .put([validator(userUpdate)], async (req, res) => {
    const { id } = req.params;
    const user = await usersService.update({ ...req.body, id });
    res.json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(204);
  });

module.exports = router;
