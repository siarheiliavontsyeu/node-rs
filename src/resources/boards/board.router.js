const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./board.model');
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(OK).json(boards.map(toResponse));
  })
  .post(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.status(OK).json(toResponse(board));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.status(OK).json(toResponse(board));
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.update({ ...req.body, id });
    res.status(OK).json(toResponse(board));
  })
  .delete(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  });

module.exports = router;
