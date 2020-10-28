const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./board.model');
const boardsService = require('./board.service');
const { id, board } = require('../../utils/validation/schemas');
const validator = require('../../utils/validation/validator');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(OK).json(boards.map(toResponse));
  })
  .post(validator(board, 'body'), async (req, res) => {
    const resBoard = await boardsService.create(req.body);
    res.status(OK).json(toResponse(resBoard));
  });

router
  .route('/:id')
  .get(validator(id, 'params'), async (req, res) => {
    const resBoard = await boardsService.get(req.params.id);
    res.status(OK).json(toResponse(resBoard));
  })
  .put(
    [validator(id, 'params'), validator(board, 'body')],
    async (req, res) => {
      const { id: reqID } = req.params;
      const resBoard = await boardsService.update({ ...req.body, reqID });
      res.status(OK).json(toResponse(resBoard));
    }
  )
  .delete(validator(id, 'params'), async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  });

module.exports = router;
