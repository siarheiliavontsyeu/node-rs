const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const validator = require('../../utils/validator');
const { userCreate, userUpdate } = require('../../schemas/userSchema');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(toResponse));
  })
  .post([validator(userCreate)], async (req, res) => {
    const user = await usersService.create(req.body);
    res.status(OK).json(toResponse(user));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(OK).json(toResponse(user));
  })
  .put([validator(userUpdate)], async (req, res) => {
    const { id } = req.params;
    const user = await usersService.update({ ...req.body, id });
    res.status(OK).json(toResponse(user));
  })
  .delete(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  });

module.exports = router;
