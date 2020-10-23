const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const validator = require('../../utils/validator');
const { boardCreate, boardUpdate } = require('../../schemas/boardSchema');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
  .post([validator(boardCreate)], async (req, res) => {
    const board = await boardsService.create(new Board(req.body));
    res.json(Board.toResponse(board));
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  })
  .put([validator(boardUpdate)], async (req, res) => {
    const { id } = req.params;
    const board = await boardsService.update({ ...req.body, id });
    res.json(Board.toResponse(board));
  })
  .delete(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  });

module.exports = router;
